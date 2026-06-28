import type { CreateEmailRequest } from "@/dtos/email.dto.js";
import type { EmailModel } from "@/models/email.model.js";
import { GraphQLError } from "graphql";
import { prismaClient } from "prisma/prisma.js";

export class EmailService {
    async findEmail(emailId: string, userId: string): Promise<EmailModel> {
        const email = await prismaClient.email.findUnique({
            where: {
                id: emailId,
            }
        })

        if (!email) throw new GraphQLError('Email not found', {
            extensions: {
                code: "EMAIL_NOT_FOUND",
                statusCode: 404,
            }
        })

        if (email.senderId !== userId && email.receiverId !== userId) throw new GraphQLError('Forbidden', {
            extensions: {
                code: "FORBIDDEN",
                statusCode: 403,
            }
        })

        if (email.receiverId === userId && email.wasSeen === false) {
            email.wasSeen = true
            await prismaClient.email.update({ where: { id: email.id }, data: { wasSeen: true } })
        }

        return email
    }

    async deleteEmail(id: string, userId: string) {
        const emailExists = await prismaClient.email.findUnique({
            where: {
                id: id,
            }
        })

        if (!emailExists) throw new GraphQLError('Email not found', {
            extensions: {
                code: "EMAIL_NOT_FOUND",
                statusCode: 404,
            }
        })

        if (emailExists.wasSeen === false && emailExists.senderId === userId) {
            return await prismaClient.email.delete({
                where: {
                    id: id,
                }
            })
        } else if (emailExists.senderId !== userId) {
            throw new GraphQLError('cannot delete an email that you have not sent', {
                extensions: {
                    code: "FORBIDDEN",
                    statusCode: 403,
                }
            })
        } else {
            throw new GraphQLError('cannot delete an email that has been seen', {
                extensions: {
                    code: "UNAUTHORIZED",
                    statusCode: 401,
                }
            })
        }
    }

    async listUserReceivedEmails(id: string): Promise<EmailModel[]> {
        return await prismaClient.email.findMany({
            where: {
                receiverId: id
            }
        })
    }

    async listUserSentEmails(id: string): Promise<EmailModel[]> {
        return await prismaClient.email.findMany({
            where: {
                senderId: id
            }
        })
    }

    async sendEmail(data: CreateEmailRequest, senderId: string): Promise<EmailModel> {
        const receiverUser = await prismaClient.user.findUnique({
            where: {
                email: data.receiverEmail.trim().toLowerCase()
            }
        })

        if (!receiverUser) throw new GraphQLError('User not found', {
            extensions: {
                code: "USER_NOT_FOUND",
                statusCode: 404,
            }
        })

        return await prismaClient.email.create({
            data: {
                title: data.title.trim(),
                content: data.content.trim(),
                senderId: senderId,
                receiverId: receiverUser.id
            }
        })
    }

}