import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { TokenRequestDto } from './dto/request/token-request.dto';
import {IntrospectTokenDto} from "./dto/request/introspect-token.dto";
import {createdResponse, successResponse} from "../common/utils/response.util";

@Controller('oauth')
export class OauthController {
    constructor(private readonly oauthService: OauthService) {}

    @Post('token')
    async getToken(@Body() dto: TokenRequestDto) {
        const data = await this.oauthService.generateToken(dto.client_id, dto.client_secret);

        return successResponse(data);
    }

    @Post('introspect')
    async introspect(@Body() dto: IntrospectTokenDto) {
        return await this.oauthService.introspectToken(dto.token);
    }
}