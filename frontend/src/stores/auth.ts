import type { LoginInput, RegisterInput, User } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { apolloClient } from "@/lib/apollo-client"
import { register } from "@/lib/graphql/mutations/register"
import { login } from "@/lib/graphql/mutations/login"

interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    signup: (payload: RegisterInput) => Promise<boolean>
    login: (payload: LoginInput) => Promise<boolean>
    logout: () => void
}

type RegisterMutationData = {
    register: {
        token: string,
        refreshToken: string,
        user: User
    }
}

type LoginMutationData = {
    login: {
        token: string,
        refreshToken: string,
        user: User
    }
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: async (payload: LoginInput) => {
                try {
                    const { data } = await apolloClient.mutate<LoginMutationData, { data: LoginInput}>({
                        mutation: login,
                        variables: {
                            data: {
                                email: payload.email,
                                password: payload.password
                            }
                        }
                    })
                    if(data?.login) {
                        const { user, token } = data.login
                        set({
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt
                            },
                            token,
                            isAuthenticated: true
                        })
                        return true
                    }
                    return false
                } catch (error) {
                    console.error(error)
                    throw error
                }
            },
            signup: async (payload: RegisterInput) => {
                try {
                    const { data } = await apolloClient.mutate<RegisterMutationData, { data: RegisterInput }>({
                        mutation: register,
                        variables: {
                            data: {
                                name: payload.name,
                                email: payload.email,
                                password: payload.password
                            }
                        }
                    })
                    if (data?.register) {
                        const { token, user } = data.register
                        set({
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt
                            },
                            token,
                            isAuthenticated: true
                        })
                        return true
                    }
                    return false
                } catch (error) {
                    console.error(error)
                    throw error
                }
            },
            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                })
                apolloClient.clearStore()
            }
        }),
        {
            name: 'auth-storage'
        }
    )
)