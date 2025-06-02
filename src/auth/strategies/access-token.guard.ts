import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { OauthService } from '../oauth.service';

@Injectable()
export class AccessTokenGuard implements CanActivate {
    constructor(private readonly oauthService: OauthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid token');
        }

        const token = authHeader.split(' ')[1];
        const payload = await this.oauthService.verifyToken(token);
        if (!payload) {
            throw new UnauthorizedException('Invalid token');
        }

        req['user'] = payload;
        return true;
    }
}