import { IsEmail, IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType({ description: "create email input"})
export class CreateEmailRequest {
    @Field(() => String)
    @IsNotEmpty({ message: 'cannot be empty'})
    title!: string

    @Field(() => String)
    @IsNotEmpty({ message: 'cannot be empty'})
    content!: string

    @Field(() => String)
    @IsNotEmpty({ message: 'cannot be empty'})
    @IsEmail({}, { message: 'must be a valid email' })
    receiverEmail!: string
}
