import { Arg, Mutation, Resolver } from "type-graphql";
import { LoginRequest, LoginResponse, RegisterRequest } from "@/dtos/auth.dto.js";
import { AuthService } from "@/services/auth.service.js";
import { UserPublicModel } from "@/dtos/user.dto.js";
import { UserService } from "@/services/user.service.js";

@Resolver()
export class AuthResolver {
    authService = new AuthService()
    userService = new UserService()

    @Mutation(() => LoginResponse)
    async login(
        @Arg('data', () => LoginRequest) data: LoginRequest
    ): Promise<LoginResponse> {
        return await this.authService.login(data)
    }

    @Mutation(() => UserPublicModel)
    async createUser(
        @Arg('data', () => RegisterRequest) data: RegisterRequest,
    ): Promise<UserPublicModel> {
        return await this.userService.createUser(data)
    }
}