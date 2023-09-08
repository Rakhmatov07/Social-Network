import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ description: 'email for login', type: 'string', example: 'example@gmail.com' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)    
    @ApiProperty({ description: 'password for login minimum 6 char', type: 'string' })
    password: string;
}
