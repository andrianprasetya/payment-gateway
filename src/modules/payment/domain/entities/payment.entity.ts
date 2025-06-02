export class Payment {
    constructor(
        public readonly id: string,
        public readonly orderId: string,
        public readonly amount: number,
        public _status: 'PENDING' | 'PAID' = 'PENDING',
    ) {}

    get status() {
        return this._status;
    }

    markAsPaid() {
        this._status = 'PAID';
    }
}

import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('payments')
export class PaymentEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    orderId: string;

    @Column('decimal')
    amount: number;

    @Column()
    status: string;
}