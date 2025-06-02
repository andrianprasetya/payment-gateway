import {Inject, Injectable} from "@nestjs/common";
import {PaymentRepository} from "../../domain/repositories/payment.repository";
import {Payment} from "../../domain/entities/payment.entity";
import { v4 as uuidv4 } from 'uuid';
import {CreatePaymentDto} from "../dto/dto";

@Injectable()
export class CreatePaymentUseCase {
    constructor(
        @Inject('PaymentRepository') private readonly repo: PaymentRepository,
    ) {}

    async execute(dto: CreatePaymentDto) {
        const payment = new Payment(uuidv4(), dto.orderId, dto.amount);
        await this.repo.save(payment);
        return payment;
    }
}