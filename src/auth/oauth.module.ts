import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OauthClientEntity } from './entities/oauth-client.entity';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

@Module({
    imports: [TypeOrmModule.forFeature([OauthClientEntity])],
    controllers: [OauthController],
    providers: [OauthService],
    exports: [OauthService],
})
export class AuthModule {}