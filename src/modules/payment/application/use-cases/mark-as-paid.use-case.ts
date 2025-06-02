import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PaymentRepository } from '../../domain/repositories/payment.repository';

@Injectable()
export class MarkAsPaidUseCase {
    constructor(
        @Inject('PaymentRepository') private readonly repo: PaymentRepository,
    ) {}

    async execute(id: string) {
        const payment = await this.repo.findById(id);
        if (!payment) throw new NotFoundException('Payment not found');
        payment.markAsPaid();
        await this.repo.save(payment);
        return payment;
    }
}