import { ApiProperty } from '@nestjs/swagger';

export class GenerateTokenResponseDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    access_token: string;

    @ApiProperty({ example: 'Bearer' })
    token_type: string;

    @ApiProperty({ example: 3600 })
    expires_in: number;

    constructor(partial: Partial<GenerateTokenResponseDto>) {
        Object.assign(this as any, partial);
    }
}