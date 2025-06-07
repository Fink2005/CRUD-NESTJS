import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Match } from 'src/shared/decorators/custom-validatator.decorator';

export class loginBodyDTO {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterBodyDTO extends loginBodyDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  @Match('password')
  confirmPassword: string;
}

export class LoginResDTO {
  accessToken: string;
  refreshToken: string;

  constructor(partial: Partial<LoginResDTO>) {
    Object.assign(this, partial);
  }
}

export class LogoutResDTO {
  message: string;
  constructor(partial: Partial<LogoutResDTO>) {
    Object.assign(this, partial);
  }
}

// export class RegisterData {
//   constructor(partial: Partial<RegisterData>) {
//     Object.assign(this, partial);
//   }
//   id: number;
//   email: string;
//   name: string;
//   @Exclude() password: string;
//   created_at: Date;
//   updated_at: Date;
// }
export class RegisterResDTO {
  id: number;
  email: string;
  name: string;
  @Exclude() password: string;
  created_at: Date;
  updated_at: Date;
  constructor(partial: Partial<RegisterResDTO>) {
    Object.assign(this, partial);
  }
}

export class RefreshTokenDTO {
  @IsString()
  refreshToken: string;
}
export class LogoutBodyDTO extends RefreshTokenDTO {}

export class RefreshTokenResDTO extends LoginResDTO {}

// export class RegisterResponseDTO extends SuccessResDTO {
//   constructor(partial: Partial<RegisterResponseDTO>) {
//     super(partial);
//     Object.assign(this, partial);
//   }
//   @Type(() => RegisterData)
//   data: RegisterData;
// }
