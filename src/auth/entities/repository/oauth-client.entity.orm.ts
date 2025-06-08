import {Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn} from 'typeorm';

@Entity('oauth_clients')
export class OauthClientEntityOrm {
    @PrimaryColumn()
    id: string;

    @Column({ unique: true })
    client_id: string;

    @Column({ unique: true })
    client_secret: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column({type : 'smallint', default: 0} )
    is_active?: number | null;

    @Column( {type: 'text', nullable: true})
    scopes?: string | null;

    @Column()
    callback_url: string;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
    updated_at: Date;


}