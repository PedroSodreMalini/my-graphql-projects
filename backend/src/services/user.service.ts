import { prismaClient } from "../../prisma/prisma.js";
import type { CreateUserInput, UpdateUserInput } from "../dtos/input/user.input.js";

export class UserService {
    async findUser(id: string) {
        const user = await prismaClient.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) throw new Error("Usuário não existe!")

        return user
    }

    async createUser(data: CreateUserInput) {
        const existingUser = prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (!!existingUser) throw new Error("Usuário já cadastrado.")

        return prismaClient.user.create({
            data: {
                name: data.name,
                email: data.email,
            }
        })
    }

    async listUsers() {
        return prismaClient.user.findMany()
    }

    async updateUser(id: string, data: UpdateUserInput) {
        const user = await prismaClient.user.findUnique({
            where: { id },
        })
        if (!user) throw new Error('Usuário não existe')

        return prismaClient.user.update({
            where: { id },
            data: {
                name: data.name ?? undefined,
                role: data.role ?? undefined,
            },
        })
    }

    async deleteUser(id: string) {
        const userExists = await prismaClient.user.findUnique({
            where: {
                id: id
            }
        })

        if(!userExists) {
            throw new Error("User not found")
        }
        
        await prismaClient.user.delete({
            where: {
                id: id
            }
        })

        return true
    }
}