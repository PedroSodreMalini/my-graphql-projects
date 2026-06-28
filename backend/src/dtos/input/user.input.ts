import { Field, InputType } from "type-graphql";
import { RoleEnum } from "../../models/user.model.js";

@InputType()
export class CreateUserInput {
    @Field(() => String)
    name!: string

    @Field(() => String)
    email!: string
}

@InputType()
export class UpdateUserInput {
    @Field(() => String)
    name!: string

    @Field(() => String)
    email!: string

    @Field(() => RoleEnum, { nullable: true })
    role?: RoleEnum
}