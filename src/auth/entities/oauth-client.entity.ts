import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('oauth_clients')
export class OauthClientEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    client_id: string;

    @Column()
    client_secret: string;

    @Column({ nullable: true })
    name?: string;

    @Column({ default: false })
    revoked: boolean;
}