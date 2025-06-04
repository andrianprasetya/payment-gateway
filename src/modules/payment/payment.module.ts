import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './interfaces/controllers/payment.controller';
import { PaymentRepositoryImpl } from './infrastructure/repositories/payment.repository.impl';
import {
    CreatePaymentUseCase,
    GetPaymentUseCase,
    DeletePaymentUseCase,
    MarkAsPaidUseCase
} from './application/use-cases/payment.use-case';
import { TransactionEntity } from './domain/entities/transaction.entity';
import {AuthModule} from "../../auth/oauth.module";

@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntity,UserEntity]),AuthModule],
    controllers: [PaymentController,UserController],
    providers: [
        CreatePaymentUseCase,
        GetPaymentUseCase,
        MarkAsPaidUseCase,
        DeletePaymentUseCase,
        {
            provide: 'PaymentRepository',
            useClass: PaymentRepositoryImpl,
        },


    ],
})
export class PaymentModule {}