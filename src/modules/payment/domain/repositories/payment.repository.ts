import {Payment} from "../entities/payment.entity";

export interface PaymentRepository {
    save(payment: Payment): Promise<void>;
    findById(id: string): Promise<Payment | null>;
    delete(id: string): Promise<void>;
}