import type { UserPublicModel } from "@/dtos/user.dto.js";
import type { UserModel } from "@/generated/prisma/models.js";

export const userMapper = (user: UserModel): UserPublicModel => {
    return {
        createdAt: user.createdAt.toISOString(),
        email: user.email,
        id: user.id,
        name: user.name,
        updatedAt: user.updatedAt.toISOString(),
    }
}