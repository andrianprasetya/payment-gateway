import {Injectable} from "@nestjs/common";
import {UserRepository} from "../../domain/repositories/user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {User, UserEntity} from "../../domain/entities/user.entity";
import {Repository} from "typeorm";

@Injectable
export class UserRepositoryImpl implements UserRepository {
    constructor(@InjectRepository(UserEntity)
                private readonly model: Repository<UserEntity>
    ) {
    }

    async findById(id: string): Promise<User | null> {
        const entity = await this.model.findOne({where: {id}});
        if (!entity) return null;
        return new User(entity.id, entity.name, entity.email, entity.password, entity.isActive as any, entity.createdAt, entity.updatedAt)
    }

    async save(user: User): Promise<void> {
        await this.model.save({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            isActive: user._isActive,
        });
    }
}