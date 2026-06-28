import { GraphQLError } from "graphql";
import { prismaClient } from "../../prisma/prisma.js";
import type { LoginRequest, LoginResponse } from "../dtos/auth.dto.js";
import { comparePassword } from "@/utils/hash.js";
import { signJwt } from "@/utils/jwt.js";
import { userMapper } from "@/mappers/user.js";

export class AuthService {
    async login(data: LoginRequest): Promise<LoginResponse> {
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        })

        if(!existingUser) throw new GraphQLError("Invalid credentials", {
            extensions: {
                code: "FORBIDDEN",
                statusCode: 403,
            }
        })

        const isSamePassword = await comparePassword(data.password, existingUser.password)

        if (!isSamePassword) throw new GraphQLError("Invalid credentials", {
            extensions: {
                code: "FORBIDDEN",
                statusCode: 403,
            }
        })

        return {
            token: this.generateToken(existingUser.id, existingUser.email),
            user: userMapper(existingUser)
        }
    }


    private generateToken(id: string, email: string) {
        const token = signJwt({ 
            id: id,
            email: email,
        }, '2h')

        return token;
    }
}