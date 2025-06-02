import {Controller, Post, Body, Get, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { CreatePaymentUseCase } from '../../application/use-cases/create-payment.use-case';
import {GetPaymentUseCase} from "../../application/use-cases/get-payment.use-case";
import {MarkAsPaidUseCase} from "../../application/use-cases/mark-as-paid.use-case";
import {DeletePaymentUseCase} from "../../application/use-cases/delete-payment.use-case";
import {CreatePaymentDto} from "../../application/dto/dto";
import {AccessTokenGuard} from "../../../../auth/strategies/access-token.guard";

@Controller('payment')
@UseGuards(AccessTokenGuard)
export class PaymentController {
    constructor(
        private readonly createPayment: CreatePaymentUseCase,
        private readonly getPayment: GetPaymentUseCase,
        private readonly markAsPaid: MarkAsPaidUseCase,
        private readonly deletePayment: DeletePaymentUseCase,
    ) {}

    @Post()
    async create(@Body() dto: CreatePaymentDto) {
        const payment = await this.createPayment.execute(dto);
        return { id: payment.id, status: payment.status };
    }

    @Get(':id')
    async find(@Param('id') id: string) {
        const payment = await this.getPayment.execute(id);
        return { id: payment.id, orderId: payment.orderId, amount: payment.amount, status: payment.status };
    }

    @Patch(':id/paid')
    async markPaid(@Param('id') id: string) {
        const payment = await this.markAsPaid.execute(id);
        return { id: payment.id, status: payment.status };
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.deletePayment.execute(id);
        return { message: 'Deleted' };
    }
}

