import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {TransactionRepository} from '../domain/transaction.repository.interface';
import {Transaction} from '../domain/transaction.entity';
import {TransactionEntityOrm} from "./transaction.entity.orm";
import {OauthClientEntityOrm} from "../../../auth/entities/repository/oauth-client.entity.orm";


@Injectable()
export class TransactionRepositoryImpl implements TransactionRepository {
    constructor(
        @InjectRepository(TransactionEntityOrm)
        private readonly model: Repository<TransactionEntityOrm>,
    ) {}


    private toDomain(entity: TransactionEntityOrm): Transaction {
        return new Transaction({
            id:entity.id,
            client_id:entity.client_id,
            amount:entity.amount,
            currency:entity.currency,
            payment_method:entity.payment_method,
            status:entity.status,
            external_ref:entity.external_ref,
            callback_sent:entity.callback_sent,
            created_at:entity.created_at,
            updated_at:entity.updated_at});
    }

    private toOrm(entity: Transaction): TransactionEntityOrm {

        const oauthClient = new OauthClientEntityOrm();
        oauthClient.id = entity.client_id;
        return {
            id: entity.id,
            client_id: entity.client_id,
            oauth_client: oauthClient,
            amount: entity.amount,
            currency: entity.currency,
            payment_method: entity.payment_method,
            external_ref: entity.external_ref,
            callback_sent: entity.callback_sent,
            status: entity.status,
            created_at:entity.created_at,
            updated_at:entity.updated_at
        };
    }
    async save(transaction: Transaction): Promise<Transaction> {
        const transactionOrm = await this.model.save(this.toOrm(transaction));
        return this.toDomain(transactionOrm)
    }

    async findById(id: string): Promise<Transaction | null> {
        const entity = await this.model.findOne({where: {id}});
        return entity ? this.toDomain(entity) : null;
    }

    async delete(id: string): Promise<void> {
        await this.model.delete(id);
    }
}
