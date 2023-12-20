import { Field, InputType, Int } from "@nestjs/graphql";

import {IsInt, IsNotEmpty, MaxLength, MinLength} from 'class-validator';

@InputType()
export class createPostInput {
    
    @Field()
    @MinLength(8, {
        message: "El titulo es demasiado corto"
    })

    @IsNotEmpty({
        message:"El titulo esta vacio"
    })
    title: string;

    @Field()
    @MaxLength(400, {
        message: "La descripcion es demaciado larga"
    })
    content: string;
    @IsInt()
    @Field()
    authorId: number
}