import {Controller, Post, Body, Get, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {
    CreatePaymentUseCase,
    GetPaymentUseCase,
    DeletePaymentUseCase,
    MarkAsPaidUseCase
} from '../../application/use-cases/payment.use-case';
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
    ) {
    }

    @Post()
    async create(@Body() dto: CreatePaymentDto) {
        return await this.createPayment.execute(dto);
    }

    @Get(':id')
    async find(@Param('id') id: string) {
        return await this.getPayment.execute(id);
    }

    @Patch(':id/paid')
    async markPaid(@Param('id') id: string) {
        return await this.markAsPaid.execute(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {

        return await this.deletePayment.execute(id);
    }
}

