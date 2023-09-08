import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateVideoDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'fileName for creating video', type: 'string', example: 'example.mp4'})
    fileName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'title for creating video', type: 'string', example: 'JavaScript'})
    title: string
}
