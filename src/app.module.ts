// app.module.ts
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PaymentModule} from './modules/payment/payment.module';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './auth/oauth.module';
import {RedisModule} from "./redis/redis.module";
import {CommandModule} from "./command/command.module";


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '250499',
            database: 'payment_db',
            synchronize: true,
            entities: [
                __dirname + '/modules/**/*.entity.orm.{ts,js}',
                __dirname + '/auth/**/*.entity.orm.{ts,js}'
            ],
        }),
        RedisModule,
        CommandModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        AuthModule,
        PaymentModule,
    ],
})
export class AppModule {
}