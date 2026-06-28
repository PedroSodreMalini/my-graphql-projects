import { IsEmail, IsNotEmpty, Length, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { UserPublicModel } from "./user.dto.js";

@InputType({ description: 'login request body'})
export class LoginRequest {
    @Field(() => String)
    @IsEmail({}, { message: 'must be a valid email'})
    @IsNotEmpty({ message: 'cannot be empty'})
    email!: string

    @Field(() => String)
    @IsNotEmpty({ message: 'cannot be empty'})
    password!: string
}

@ObjectType({ description: 'login response body'})
export class LoginResponse {
    @Field(() => String)
    token!: string

    @Field(() => UserPublicModel)
    user !: UserPublicModel
}

@InputType({ description: "DTO for user creation" })
export class RegisterRequest {
    @Field(() => String)
    @IsNotEmpty({ message: "cannot be empty" })
    @MinLength(2, { message: 'must have at least 2 characters' })
    name!: string

    @Field(() => String)
    @IsNotEmpty({ message: "cannot be empty" })
    @IsEmail({}, { message: 'must be a valid email' })
    email!: string

    @Field(() => String)
    @Length(6, 20, { message: 'must have between 6-20 characters' })
    password!: string
}