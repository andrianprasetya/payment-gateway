import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PaymentRepository} from '../../domain/repositories/payment.repository';
import {TransactionEntity} from '../../domain/entities/transaction.entity';


@Injectable()
export class PaymentRepositoryImpl implements PaymentRepository {
    constructor(
        @InjectRepository(TransactionEntity)
        private readonly model: Repository<TransactionEntity>,
    ) {}

    async save(transaction: TransactionEntity): Promise<void> {
        await this.model.save(transaction);
    }

    async findById(id: string): Promise<TransactionEntity | null> {
        const entity = await this.model.findOne({where: {id}});
        if (!entity) return null;
        return new TransactionEntity(entity);
    }

    async delete(id: string): Promise<void> {
        await this.model.delete(id);
    }
}
