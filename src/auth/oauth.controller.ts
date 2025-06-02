import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { TokenRequestDto } from './dto/token-request.dto';
import {RegisterClientDto} from "./dto/register-client.dto";
import {IntrospectTokenDto} from "./dto/introspect-token.dto";

@Controller('oauth')
export class OauthController {
    constructor(private readonly oauthService: OauthService) {}

    @Post('token')
    async getToken(@Body() dto: TokenRequestDto) {
        const token = await this.oauthService.generateToken(dto.client_id, dto.client_secret);
        if (!token) {
            throw new UnauthorizedException('Invalid client credentials');
        }
        return { access_token: token, token_type: 'Bearer', expires_in: 3600 };
    }
    @Post('register')
    async registerClient(@Body() dto: RegisterClientDto) {
        const client = await this.oauthService.registerClient(dto.name);
        return { id: client.id, client_id: client.client_id };
    }

    @Post('introspect')
    async introspect(@Body() dto: IntrospectTokenDto) {
        return await this.oauthService.introspectToken(dto.token);
    }
}