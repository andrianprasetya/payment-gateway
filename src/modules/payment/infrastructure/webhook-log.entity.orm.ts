import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne
} from 'typeorm';
import {OauthClientEntityOrm} from "../../../auth/entities/repository/oauth-client.entity.orm";
import {TransactionEntityOrm} from "./transaction.entity.orm";


@Entity('webhook_logs')
export class WebhookLogEntityOrm {
    @PrimaryColumn()
    id: string;

    @OneToOne(() => TransactionEntityOrm, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'transaction_id' })
    transaction: TransactionEntityOrm;

    @Column()
    action: string;

    @Column()
    ip_address: string;

    @Column({type: 'text'})
    user_agent: string;

    @Column({type: 'jsonb'})
    metadata: string;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    created_at: Date;

    get transaction_id(): string {
        return this.transaction.id;
    }
}