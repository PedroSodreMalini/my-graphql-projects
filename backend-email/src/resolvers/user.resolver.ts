import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UpdateUserRequest, UserPublicModel } from "@/dtos/user.dto.js";
import { UserService } from "@/services/user.service.js";
import { isAuth } from "@/middleware/auth.middleware.js";
import { GqlUser } from "@/graphql/decorators/user.decorator.js";

@Resolver(() => UserPublicModel)
@UseMiddleware(isAuth)
export class UserResolver {
    userService = new UserService()

    /* -- Queries -- */
    @Query(() => UserPublicModel)
    async findUser(
        @Arg('id', () => String) id: string,
    ): Promise<UserPublicModel> {
        return await this.userService.findUser(id)
    }

    @Query(() => UserPublicModel)
    async me(
        @GqlUser() user: UserPublicModel,
    ) {
        return user
    }

    @Query(() => [UserPublicModel])
    async listUsers() : Promise<UserPublicModel[]> {
        return this.userService.listUser()
    }

    /* -- Mutations -- */
    @Mutation(() => UserPublicModel)
    async updateMe(
        @Arg('data', () => UpdateUserRequest) data: UpdateUserRequest,
        @GqlUser() user: UserPublicModel,
    ): Promise<UserPublicModel> {
        return await this.userService.updateUser(data, user.id)
    }

    @Mutation(() => UserPublicModel)
    async deleteMe(
        @GqlUser() user: UserPublicModel,
    ): Promise<UserPublicModel> {
        return this.userService.deleteUser(user.id)
    }
}