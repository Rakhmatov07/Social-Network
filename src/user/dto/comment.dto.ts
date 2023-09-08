import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CommentDto {
    @IsNotEmpty()
    @ApiProperty({ description: 'text for comment', type: 'string' })
    text: string
}
