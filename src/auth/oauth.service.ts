import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis'
import { OauthClientEntity } from './entities/oauth-client.entity';
import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import {randomBytes} from "crypto";

@Injectable()
export class OauthService {
    constructor(
        @InjectRepository(OauthClientEntity)
        private readonly repo: Repository<OauthClientEntity>,
        private config: ConfigService,
        @InjectRedis() private readonly redis: Redis,
    ) {}

    getSecret():string {
        return this.config.get<string>('JWT_SECRET') || 'default-secret';
    }

    async generateToken(client_id: string, client_secret: string): Promise<string | null> {
        const client = await this.repo.findOneBy({ client_id, client_secret });
        if (!client) return null;

        const payload = { sub: client.client_id };
        const token = jwt.sign(payload, this.getSecret(), { expiresIn: '1h' });

        await this.redis.set(`access_token:${token}`, JSON.stringify(payload), 'EX', 3600);
        return token;
    }

    async verifyToken(token: string): Promise<any> {
        const cached = await this.redis.get(`access_token:${token}`);
        if (cached) return JSON.parse(cached);

        try {
            const decoded = jwt.verify(token, this.getSecret());
            await this.redis.set(`access_token:${token}`, JSON.stringify(decoded), 'EX', 3600);
            return decoded;
        } catch (e) {
            return null;
        }
    }

    async registerClient(name: string): Promise<OauthClientEntity> {
        const client_id = uuidv4();
        const client_secret = randomBytes(32).toString('hex');
        const client = this.repo.create(
            { client_id, client_secret, name }
        );
        return await this.repo.save(client);
    }

    async introspectToken(token: string): Promise<any> {
        try {
            // Cek cache Redis dulu
            const cached = await this.redis.get(`access_token:${token}`);
            if (cached) {
                const payload = JSON.parse(cached);
                return { active: true, ...payload };
            }

            const payload = jwt.verify(token, this.getSecret());
            if (typeof payload === 'object' && payload !== null) {
                return { active: true, ...payload };
            }
            return { active: false };
        } catch (e) {
            return { active: false };
        }
    }
}