import { IsNotEmpty, Matches, MinLength } from 'class-validator';
import { IsSame } from 'src/validators/is-same.validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/(?=.*[A-Z])/, { message: 'UPPER_CASE_REQUIRED' })
  @Matches(/(?=.*[a-z])/, { message: 'LOWER_CASE_REQUIRED' })
  @Matches(/(?=.*\d)/, { message: 'DIGIT_REQIRED' })
  @Matches(/^(?:[^A-Za-z\p{L}]|[A-Za-z])*$/u, { message: 'ONLY_LATIN_LETTERS_ALLOWED' })
  @Matches(/(?=.*[^A-Za-z0-9])/, { message: 'SPECIAL_SYMBOL_REQUIRED' })
  password: string;

  @IsNotEmpty()
  @IsSame('password', { message: 'PASSWORD_MATCH' })
  confirmPassword: string;
}

