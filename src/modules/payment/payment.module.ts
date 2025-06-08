import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './interfaces/controllers/transaction.controller';
import { TransactionRepositoryImpl } from './infrastructure/transaction.repository';
import {
    TransactionService
} from './application/transaction.service';
import {TransactionEntityOrm} from './infrastructure/transaction.entity.orm';
import {AuthModule} from "../../auth/oauth.module";

@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntityOrm]),AuthModule],
    controllers: [TransactionController],
    providers: [
        TransactionService,
        {
            provide: 'TransactionRepository',
            useClass: TransactionRepositoryImpl,
        },


    ],
})
export class PaymentModule {}