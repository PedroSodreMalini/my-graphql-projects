import { UserPublicModel } from "@/dtos/user.dto.js";
import { Field, GraphQLISODateTime, ObjectType } from "type-graphql";

@ObjectType({ description: 'Modelo de email' })
export class EmailModel {
    @Field(() => String)
    id!: string

    @Field(() => String)
    title!: string

    @Field(() => String)
    content!: string

    @Field(() => GraphQLISODateTime)
    createdAt!: Date

    @Field(() => String)
    receiverId!: string

    @Field(() => String)
    senderId!: string

    @Field(() => UserPublicModel, { nullable: true })
    sender?: UserPublicModel

    @Field(() => UserPublicModel, { nullable: true })
    receiver?: UserPublicModel
}