import { IsEmail, IsNotEmpty } from "class-validator";
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