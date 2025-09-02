import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserRole } from 'src/common/contracts/enums/user-role.enum';

export class UserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  passwordHash: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
