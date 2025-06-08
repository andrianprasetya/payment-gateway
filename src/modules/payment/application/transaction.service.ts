import {Inject, Injectable, NotFoundException} from "@nestjs/common";
import {TransactionRepository} from "../domain/transaction.repository.interface";
import {Transaction} from "../domain/transaction.entity";
import {v4 as uuidv4} from 'uuid';
import {CreateTransactionDto} from "./dto/dto";
import {createdResponse, successResponse} from "../../../common/utils/response.util";

@Injectable()
export class TransactionService {
    constructor(
        @Inject('TransactionRepository') private readonly repo: TransactionRepository,
    ) {
    }

    async create(dto: CreateTransactionDto): Promise<Transaction> {
        const transaction = new Transaction({
            client_id: 'client-id-123',
            amount: dto.amount,
            currency: dto.currency,
            payment_method: dto.payment_method,
            status: dto.status,
            external_ref: uuidv4(),
            callback_sent: false
        });

        return await this.repo.save(transaction);
    }

    async getTransactionById(id: string): Promise<Transaction> {
        const transaction = await this.repo.findById(id);
        if (!transaction) throw new NotFoundException('Transaction not found');
        return transaction;
    }

    async markAsPaid(id: string): Promise<Transaction> {
        const transaction = await this.repo.findById(id);
        if (!transaction) throw new NotFoundException('Transaction not found');
        transaction.marAsPaid();
        await this.repo.save(transaction);
        return transaction;
    }

    async delete(id: string): Promise<void> {
        const transaction = await this.repo.findById(id);
        if (!transaction) throw new NotFoundException('Transaction not found');
        await this.repo.delete(id);
    }
}

