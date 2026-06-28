import { Field, GraphQLISODateTime, ObjectType } from "type-graphql";

// Esse modelo não é exposto, pois contém a senha do usuário.
@ObjectType({
    description: 'Modelo de usuário - Não é exposto devido a senha'
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