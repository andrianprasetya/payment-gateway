import { IsString } from 'class-validator';

export class TokenRequestDto {
    @IsString()
    client_id: string;

    @IsString()
    client_secret: string;
}