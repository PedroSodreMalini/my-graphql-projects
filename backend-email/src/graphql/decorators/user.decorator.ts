import { createParameterDecorator, type ResolverData } from "type-graphql"
import type { GraphqlContext } from "../context/index.js"
import { prismaClient } from "@/../prisma/prisma.js"
import { userMapper } from "@/mappers/user.js"
import type { UserPublicModel } from "@/dtos/user.dto.js"

export const GqlUser = () => {
    return createParameterDecorator(
        async({ context }: ResolverData<GraphqlContext>): Promise<UserPublicModel | null>  => {
            if (!context || !context.user) return null

            try {
                const user = await prismaClient.user.findUnique({
                    where: {
                        id: context.user
                    }
                })
                if (!user) throw new Error("User not found!")
                
                return userMapper(user)
            } catch (error) {
                console.log("Erro ao instanciar o gqluser.")
            }
            return null
        })
}