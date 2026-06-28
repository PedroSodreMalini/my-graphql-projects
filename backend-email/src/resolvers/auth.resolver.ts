import { Arg, Mutation, Resolver } from "type-graphql";
import { LoginRequest, LoginResponse } from "@/dtos/auth.dto.js";
import { AuthService } from "@/services/auth.service.js";

@Resolver()
export class AuthResolver {
    authService = new AuthService()

    @Mutation(() => LoginResponse)
    async login(
        @Arg('data', () => LoginRequest) data: LoginRequest
    ) : Promise<LoginResponse> {
        return await this.authService.login(data)
    }
}