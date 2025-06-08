import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import {OauthClientEntityOrm} from "../../../auth/entities/repository/oauth-client.entity.orm";

export enum UserStatus {
    CREATED = 'created',
    PROCESSING = 'processing',
    PAID = 'paid',
    FAILED = 'failed'
}

@Entity('transactions')
export class TransactionEntityOrm {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => OauthClientEntityOrm, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'client_id' })
    oauth_client: OauthClientEntityOrm;

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

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.CREATED
    })
    status: string;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
    updated_at: Date;

    get client_id(): string {
        return this.oauth_client.id;
    }
}