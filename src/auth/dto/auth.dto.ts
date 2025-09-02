import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthInputDto {
  @ApiProperty({
    example: 'user123',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    example: 'secret-password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
