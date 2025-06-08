import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OauthClientEntityOrm } from './entities/repository/oauth-client.entity.orm';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

@Module({
    imports: [TypeOrmModule.forFeature([OauthClientEntityOrm])],
    controllers: [OauthController],
    providers: [OauthService],
    exports: [OauthService, TypeOrmModule],
})
export class AuthModule {}