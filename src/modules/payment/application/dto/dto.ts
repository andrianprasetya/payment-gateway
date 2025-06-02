import {IsNotEmpty, IsNumber, IsString, Min} from "class-validator";

export class CreatePaymentDto {
    @IsNotEmpty()
    @IsString()
    orderId: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    amount: number;
}