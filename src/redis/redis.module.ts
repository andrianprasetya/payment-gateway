import {Module} from '@nestjs/common';
import {RedisModule as NestRedisModule, RedisModuleOptions} from '@nestjs-modules/ioredis';

@Module({
    imports: [
        NestRedisModule.forRootAsync({
            useFactory: async (): Promise<RedisModuleOptions> => ({
                type: 'single',
                options: {
                    host: process.env.REDIS_HOST,
                    port: Number(process.env.REDIS_PORT),
                    username: process.env.REDIS_USERNAME,
                    password: process.env.REDIS_PASSWORD,
                },
            }),
            inject: [],
            imports: [],
        }),
    ],
    exports: [NestRedisModule],
})
export class RedisModule {
}