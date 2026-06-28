import { isAuth } from "@/middleware/auth.middleware.js";
import { EmailModel } from "@/models/email.model.js";
import { EmailService } from "@/services/email.service.js";
import { UserService } from "@/services/user.service.js";
import { Resolver, UseMiddleware } from "type-graphql";

@Resolver(() => EmailModel)
@UseMiddleware(isAuth)
export class EmailResolver{
    emailService = new EmailService()
    userService = new UserService()

    /*--Queries--*/

    /*--Mutations--*/
}