import {
  IsString,
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @Length(11)
  @IsNotEmpty()
  cpf: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Length(6)
  @IsAlpha()
  @IsNotEmpty()
  password: string;
}
