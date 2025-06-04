import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity('oauth_clients')
export class OauthClientEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    client_secret: string;

    @Column({ nullable: true })
    name?: string;

    @Column({type : 'smallint', default: 0} )
    isActive: string;

    @Column( {type: 'text', nullable: true})
    scopes?: string;

    @Column()
    callback_url: string;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
    updatedAt: Date;

    constructor(partial: Partial<OauthClientEntity>) {
        Object.assign(this as any, partial);
    }
}