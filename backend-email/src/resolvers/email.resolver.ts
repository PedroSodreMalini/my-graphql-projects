import { CreateEmailRequest } from "@/dtos/email.dto.js";
import { UserPublicModel } from "@/dtos/user.dto.js";
import { GqlUser } from "@/graphql/decorators/user.decorator.js";
import { isAuth } from "@/middleware/auth.middleware.js";
import { EmailModel } from "@/models/email.model.js";
import { EmailService } from "@/services/email.service.js";
import { UserService } from "@/services/user.service.js";
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";

@Resolver(() => EmailModel)
@UseMiddleware(isAuth)
export class EmailResolver{
    emailService = new EmailService()
    userService = new UserService()

    /*--Queries--*/
    @Query(() => [EmailModel])
    async myReceivedEmails(
        @GqlUser() user: UserPublicModel,
    ): Promise<EmailModel[]> {
        return await this.emailService.listUserReceivedEmails(user.id)
    }

    @Query(() => [EmailModel])
    async mySentEmails(
        @GqlUser() user: UserPublicModel,
    ): Promise<EmailModel[]> {
        return await this.emailService.listUserSentEmails(user.id)
    }

    @Query(() => EmailModel)
    async findEmail(
        @Arg("id", () => String) id: string,
        @GqlUser() user: UserPublicModel,
    ): Promise<EmailModel> {
        return await this.emailService.findEmail(id, user.id)
    }

    /*--Mutations--*/
    @Mutation(() => EmailModel)
    async sendEmail(
        @Arg("data", () => CreateEmailRequest) data: CreateEmailRequest,
        @GqlUser() user: UserPublicModel,
    ): Promise<EmailModel> {
        return await this.emailService.sendEmail(data, user.id)
    }

    @Mutation(() => EmailModel)
    async deleteEmail(
        @Arg('id', () => String) id: string,
        @GqlUser() user: UserPublicModel,
    ): Promise<EmailModel> {
        return await this.emailService.deleteEmail(id, user.id)
    }

    /*--Field Resolvers--*/
    @FieldResolver(() => UserPublicModel)
    async sender(@Root() email: EmailModel): Promise<UserPublicModel> {
        return this.userService.findUser(email.senderId)
    }

    @FieldResolver(() => UserPublicModel)
    async receiver(@Root() email: EmailModel): Promise<UserPublicModel> {
        return this.userService.findUser(email.receiverId)
    }
}