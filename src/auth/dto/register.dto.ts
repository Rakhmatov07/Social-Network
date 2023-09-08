import { IsString, IsNotEmpty, IsEmail, MinLength, IsNumber, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export enum Gender {
    male = 'male',
    female = 'female'
}

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'firstname for register', type: 'string' })
    firstname: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'lastname for register', type: 'string' })
    lastname: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ description: 'email for register', type: 'string', example: 'example@gmail.com' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({ description: 'password for register minimum 6 char', type: 'string' })
    password: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'age for register', type: 'number' })
    age: number;

    @IsEnum(Gender)
    @IsNotEmpty()
    @ApiProperty({ description: 'gender for register " male or female "', type: 'string' })
    public gender: Gender;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'country for register', type: 'string' })
    country: String
}
