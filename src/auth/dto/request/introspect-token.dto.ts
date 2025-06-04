import { IsNotEmpty, IsString } from 'class-validator';

export class IntrospectTokenDto {
    @IsNotEmpty()
    @IsString()
    token: string;
}