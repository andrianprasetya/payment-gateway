import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity('payments')
export class TransactionEntity {
    @PrimaryColumn()
    id: string;

    @Column({foreignKeyConstraintName: 'Client'})
    client_id: string;

    @Column('decimal')
    amount: number;

    @Column({comment:" IDR | USD"})
    currency: string;

    @Column({comment: "bank_transfer,qris,dll"})
    payment_method:string;

    @Column()
    external_ref: string;

    @Column()
    callback_sent: boolean;

    @Column()
    status: string;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
    updatedAt: Date;

    constructor(partial: Partial<TransactionEntity>) {
        Object.assign(this as any, partial);
    }

}