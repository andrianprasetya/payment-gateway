import {Inject, Injectable} from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import {CreateUserDto} from "../dto/dto";
import {UserRepository} from "../../domain/repositories/user.repository";
import {User} from "../../domain/entities/user.entity";

@Injectable()
export class CreatePaymentUseCase {
    constructor(
        @Inject('UserRepository') private readonly repo: UserRepository,
    ) {}

    async execute(dto: CreateUserDto) {
        const user = new User(uuidv4(), dto.name, dto.email, dto.password, 0, );
        await this.repo.save(user);
        return user;
    }
}