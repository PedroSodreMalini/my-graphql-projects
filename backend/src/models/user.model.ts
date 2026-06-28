import { Field, GraphQLISODateTime, ID, ObjectType, registerEnumType } from "type-graphql";

export enum RoleEnum {
  owner = 'owner',
  admin = 'admin',
  member = 'member',
  viewer = 'viewer',
}

registerEnumType(RoleEnum, {
    name: 'role',
    description: 'User role in system',
})

@ObjectType()
export class UserModel {
    @Field(() => ID)
    id!: string

    @Field(() => String)
    name!: string

    @Field(() => String)
    email!: string

    @Field(() => String, { nullable: true })
    password?: string | null

    @Field(() => RoleEnum, { nullable: true })
    role?: string

    @Field(() => GraphQLISODateTime)
    createdAt!: Date

    @Field(() => GraphQLISODateTime)
    updatedAt!: Date
}