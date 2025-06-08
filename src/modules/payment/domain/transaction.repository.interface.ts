import {Transaction} from "./transaction.entity";

export interface TransactionRepository {
    save(transaction: Transaction): Promise<Transaction>;

    findById(id: string): Promise<Transaction | null>;

    delete(id: string): Promise<void>;
}