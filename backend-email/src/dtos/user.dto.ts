import { IsEmail, MinLength } from "class-validator";
import { Field, GraphQLISODateTime, InputType, ObjectType } from "type-graphql";

@ObjectType({ description: "Exposed user class" })
export class UserPublicModel {
    @Field(() => String)
    id!: string

    @Field(() => String)
    name!: string

    @Field(() => String)
    email!: string

    @Field(() => GraphQLISODateTime)
    createdAt!: string

    @Field(() => GraphQLISODateTime)
    updatedAt!: string
}

@InputType({ description: "DTO for user self update" })
export class UpdateUserRequest {
    @Field(() => String, { nullable: true })
    @MinLength(2, { message: 'must have at least 2 characters' })
    name?: string

    @Field(() => String, { nullable: true })
    @IsEmail({}, { message: 'must be a valid email' })
    email?: string
}