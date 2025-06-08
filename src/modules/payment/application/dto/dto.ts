import {IsNotEmpty, IsNumber, IsString, Min} from "class-validator";

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsString()
    currency: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    amount: number;

    @IsNotEmpty()
    @IsString()
    payment_method: string;

    @IsNotEmpty()
    @IsString()
    status: string;

}
