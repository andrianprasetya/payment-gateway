import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import {OauthClientEntityOrm} from "../../../auth/entities/repository/oauth-client.entity.orm";


@Entity('audit_logs')
export class AuditLogEntityOrm {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => OauthClientEntityOrm, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'client_id' })
    oauth_client: OauthClientEntityOrm;

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

    get client_id(): string {
        return this.oauth_client.id;
    }
}