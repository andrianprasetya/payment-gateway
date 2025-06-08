import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {InjectRedis} from '@nestjs-modules/ioredis';
import {Redis} from 'ioredis'
import {OauthClientEntity} from './entities/oauth-client.entity';
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import * as jwt from 'jsonwebtoken';
import {randomBytes} from "crypto";
import {GenerateTokenResponseDto} from "./dto/response/generate-token-response.dto";
import {OauthClientEntityOrm} from "./entities/repository/oauth-client.entity.orm";
import {v4 as uuid} from "uuid";

@Injectable()
export class OauthService {
    constructor(
        @InjectRepository(OauthClientEntityOrm)
        private readonly repo: Repository<OauthClientEntityOrm>,
        private config: ConfigService,
        @InjectRedis() private readonly redis: Redis,
    ) {
    }

    private toDomain(entity: OauthClientEntityOrm): OauthClientEntity {
        return new OauthClientEntity({
            id: entity.id,
            client_id: entity.client_id,
            client_secret: entity.client_secret,
            email: entity.email,
            name: entity.name,
            is_active: entity.is_active,
            scopes: entity.scopes,
            callback_url: entity.callback_url,
            created_at: entity.created_at,
            updated_at: entity.updated_at
        });
    }

    private toOrm(entity: OauthClientEntity): OauthClientEntityOrm {
        return {
            id: entity.id,
            client_id: entity.client_id,
            client_secret: entity.client_secret,
            email: entity.email,
            name: entity.name,
            is_active: entity.is_active,
            scopes: entity.scopes,
            callback_url: entity.callback_url,
            created_at: entity.created_at,
            updated_at: entity.updated_at
        };
    }

    getSecret(): string {
        return this.config.get<string>('JWT_SECRET') || 'default-secret';
    }

    async generateToken(client_id: string, client_secret: string): Promise<GenerateTokenResponseDto | null> {
        const client = await this.repo.findOneBy({client_id: client_id, client_secret});
        if (!client) {
            throw new UnauthorizedException('Invalid client credentials');
        }

        const cached = await this.redis.get(`access_token:${client.id}`);
        if (!cached) {
            return new GenerateTokenResponseDto(cached)
        }

        const payload = {
            id: client.id,
            client_id: client.client_id,
            name: client.name,
            email: client.email,
            callback_url: client.callback_url
        };
        const token = jwt.sign(payload, this.getSecret(), {expiresIn: 900});
        await this.redis.set(`access_token:${client.id}`, JSON.stringify(payload), 'EX', 900);

        return new GenerateTokenResponseDto({access_token: token, token_type: 'Bearer', expires_in: 900});
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

    async registerClient(data: { name: string; email: string; callback_url: string }): Promise<OauthClientEntity> {

        const client_secret = randomBytes(32).toString('hex');

        const oauth_client_entity = new OauthClientEntity({
            client_id: uuid(),
            client_secret: client_secret,
            email: data.email,
            name: data.name,
            callback_url: data.callback_url,
            is_active: 0
        })
        const client = this.repo.create(this.toOrm(oauth_client_entity));
        const ormOauthClient = await this.repo.save(client)
        return this.toDomain(ormOauthClient);
    }

    async introspectToken(token: string): Promise<any> {
        try {
            // Cek cache Redis dulu
            const cached = await this.redis.get(`access_token:${token}`);
            if (cached) {
                const payload = JSON.parse(cached);
                return {active: true, ...payload};
            }

            const payload = jwt.verify(token, this.getSecret());
            if (typeof payload === 'object' && payload !== null) {
                return {active: true, ...payload};
            }
            return {active: false};
        } catch (e) {
            return {active: false};
        }
    }
}