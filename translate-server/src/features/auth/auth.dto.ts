import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: (args) => `${args.value} no es un email válido.` })
  @IsNotEmpty({
    message: 'El campo email no puede estar vacío.',
  })
  readonly email: string;
  @IsNotEmpty({
    message: 'La contraseña no puede estar vacía.',
  })
  readonly password: string;
}

export class RegisterDto extends LoginDto {
  @IsNotEmpty({
    message: 'El campo nombre no puede estar vacío.',
  })
  readonly name: string;
}
