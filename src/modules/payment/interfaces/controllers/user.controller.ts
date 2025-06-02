import {Controller} from "@nestjs/common";
import { CreateUserUseCase } from "../../domain/repositories/user.repository"

@Controller('payment')
export class PaymentController {
    constructor(
        private readonly createUser: CreateUserUseCase,
        private readonly getUser: GetUserUseCase,
    ) {}