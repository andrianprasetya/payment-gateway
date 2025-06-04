import {TransactionEntity} from "../entities/transaction.entity";

export interface PaymentRepository {
    save(payment: TransactionEntity): Promise<void>;

    findById(id: string): Promise<TransactionEntity | null>;

    delete(id: string): Promise<void>;
}