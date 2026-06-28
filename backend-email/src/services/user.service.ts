import { GraphQLError } from "graphql";
import { prismaClient } from "../../prisma/prisma.js";
import type { CreateUserRequest, UpdateUserRequest, UserPublicModel } from "../dtos/user.dto.js";
import { userMapper } from "../mappers/user.js";
import { hashPassword } from "../utils/hash.js";

export class UserService {
    async createUser(data: CreateUserRequest): Promise<UserPublicModel> {
        const userExists = await prismaClient.user.findUnique({
            where: {
                email: data.email.trim()
            }
        })

        if (userExists) throw new GraphQLError("User already exists", {
            extensions: {
                code: "USER_ALREADY_EXISTS",
                statusCode: 409,
            }
        })

        const newUser = await prismaClient.user.create({
            data: {
                email: data.email.trim(),
                name: data.name.trim(),
                password: await hashPassword(data.password),
            }
        })

        return userMapper(newUser)
    }

    async deleteUser(id: string): Promise<UserPublicModel>{
        const deletedUser = await prismaClient.user.delete({
            where: {
                id: id,
            }
        })

        if (!deletedUser) throw new GraphQLError("User not found", {
            extensions: {
                code: "USER_NOT_FOUND",
                statusCode: 404,
            }
        })

        return userMapper(deletedUser)
    }


    async findUser(id: string): Promise<UserPublicModel> {
        const user = await prismaClient.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) throw new GraphQLError("User not found", {
            extensions: {
                code: "USER_NOT_FOUND",
                statusCode: 404,
            }
        })

        return userMapper(user)
    }

    async listUser(): Promise<UserPublicModel[]> {
        const users = await prismaClient.user.findMany()

        return users.map((u) => userMapper(u))
    }

    async updateUser(data: UpdateUserRequest, id: string): Promise<UserPublicModel> {
        if (!data.name && !data.email) {
            throw new GraphQLError("email or name must be provided.", {
                extensions: {
                    code: "BAD_USER_INPUT",
                    statusCode: 400,
                },
            });
        }

        const existsUser = await prismaClient.user.findUnique({
            where: {
                id: id,
            }
        })

        if (!existsUser) throw new GraphQLError("User not found", {
            extensions: {
                code: "USER_NOT_FOUND",
                statusCode: 404,
            }
        })

        if (data?.email) {
            const emailAlreadyExists = await prismaClient.user.findUnique({
                where: {
                    email: data.email,
                }
            })

            if (emailAlreadyExists && emailAlreadyExists.id !== id) throw new GraphQLError("Email already registered", {
                extensions: {
                    code: "CONFLICT",
                    statusCode: 409,
                }
            })
        }

        // se não retornar nada, só retorna o usuário.
        if ((existsUser.email === data.email || data.email === null) 
            && (existsUser.name === data.name || data.name === null)) {
            return userMapper(existsUser)
        } else { // senão, faz atualização 
            const userUpdated = await prismaClient.user.update({
                data: {
                    email: data.email?.trim().toLowerCase() ?? undefined,
                    name: data.name?.trim() ?? undefined,
                },
                where: {
                    id: id,
                }
            })

            return userMapper(userUpdated)
        }
    }
}