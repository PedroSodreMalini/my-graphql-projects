import { Field, GraphQLISODateTime, ObjectType } from "type-graphql";

@ObjectType({
    description: 'Modelo de usuário'
})
export class UserModel {
    @Field(() => String, { name: 'Id', description: "ID do usuário"})
    id!: string

    @Field(() => String)
    name!: string

    @Field(() => String)
    email!: string

    @Field(() => String, { nullable: true })
    password?: string

    @Field(() => GraphQLISODateTime)
    createdAt!: string

    @Field(() => GraphQLISODateTime)
    updatedAt!: string
}