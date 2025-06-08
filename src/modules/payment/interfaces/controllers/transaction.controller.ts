import {Controller, Post, Body, Get, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {TransactionService} from '../../application/transaction.service';
import {CreateTransactionDto} from "../../application/dto/dto";
import {AccessTokenGuard} from "../../../../auth/strategies/access-token.guard";
import {createdResponse, successResponse} from "../../../../common/utils/response.util";

@Controller('payment')
@UseGuards(AccessTokenGuard)
export class TransactionController {
    constructor(
        private readonly transactionService: TransactionService,
    ) {
    }

    @Post()
    async create(@Body() dto: CreateTransactionDto) {
        const data = await this.transactionService.create(dto)
        return createdResponse(data);
    }

    @Get(':id')
    async find(@Param('id') id: string) {
        const data = await this.transactionService.getTransactionById(id)
        return successResponse(data);
    }

    @Patch(':id/paid')
    async markPaid(@Param('id') id: string) {
        const data = await this.transactionService.markAsPaid(id)
        return successResponse(data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.transactionService.delete(id)
        return successResponse(undefined, "Deleted Successfully");
    }
}

