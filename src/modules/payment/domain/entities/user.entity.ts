export class User {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public _isActive: 0 | 1 = 0,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {
    }
}

import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'

@Entity('users')
export class UserEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'smallint',
        width: 1,
        default: 0
    })
    isActive: number;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
    updatedAt: Date;
}