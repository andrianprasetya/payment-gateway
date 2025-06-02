import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PaymentRepository} from '../../domain/repositories/payment.repository';
import {Payment, PaymentEntity} from '../../domain/entities/payment.entity';


@Injectable()
export class PaymentRepositoryImpl implements PaymentRepository {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly model: Repository<PaymentEntity>,
    ) {
    }

    async save(payment: Payment): Promise<void> {
        await this.model.save({
            id: payment.id,
            orderId: payment.orderId,
            amount: payment.amount,
            status: payment.status,
        });
    }

    async findById(id: string): Promise<Payment | null> {
        const entity = await this.model.findOne({where: {id}});
        if (!entity) return null;
        return new Payment(entity.id, entity.orderId, entity.amount, entity.status as any);
    }

    async delete(id: string): Promise<void> {
        await this.model.delete(id);
    }
}
