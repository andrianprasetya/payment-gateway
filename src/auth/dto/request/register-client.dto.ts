import { IsString } from 'class-validator';

export class RegisterClientDto {
    @IsString()
    name: string;
}