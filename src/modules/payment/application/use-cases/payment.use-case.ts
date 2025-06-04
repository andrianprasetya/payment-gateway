import {Inject, Injectable, NotFoundException} from "@nestjs/common";
import {PaymentRepository} from "../../domain/repositories/payment.repository";
import {TransactionEntity} from "../../domain/entities/transaction.entity";
import {v4 as uuidv4} from 'uuid';
import {CreatePaymentDto} from "../dto/dto";
import {createdResponse, successResponse} from "../../../../common/utils/response.util";

@Injectable()
export class CreatePaymentUseCase {
    constructor(
        @Inject('PaymentRepository') private readonly repo: PaymentRepository,
    ) {}

    async execute(dto: CreatePaymentDto) {
        let transaction = new TransactionEntity();

        transaction.id = uuidv4();
        transaction.client_id = "test";
        transaction.amount = 123;
        transaction.payment_method = "transfer";
        transaction.callback_sent = false;
        transaction.external_ref = "test";
        transaction.currency = "IDR";

        await this.repo.save(transaction);
        return createdResponse(transaction);
    }
}

@Injectable()
export class GetPaymentUseCase {
    constructor(
        @Inject('PaymentRepository') private readonly repo: PaymentRepository,
    ) {
    }

    async execute(id: string) {
        const payment = await this.repo.findById(id);
        if (!payment) throw new NotFoundException('Payment not found');
        return successResponse(payment);
    }
}

@Injectable()
export class MarkAsPaidUseCase {
    constructor(
        @Inject('PaymentRepository') private readonly repo: PaymentRepository,
    ) {
    }

    async execute(id: string) {
        const payment = await this.repo.findById(id);
        if (!payment) throw new NotFoundException('Payment not found');
        payment.status = "paid";
        await this.repo.save(payment);
        return successResponse(payment);
    }
}

@Injectable()
export class DeletePaymentUseCase {
    constructor(
        @Inject('PaymentRepository') private readonly repo: PaymentRepository,
    ) {
    }

    async execute(id: string) {
        const payment = await this.repo.findById(id);
        if (!payment) throw new NotFoundException('Payment not found');
        await this.repo.delete(id);
        return successResponse(undefined, "Deleted Successfully")
    }
}

