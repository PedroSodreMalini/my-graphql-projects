import { gql } from "@apollo/client"

export const login = gql`
    mutation Login($data: LoginInput!) {
        login(data: $data) {
            token
            refreshToken
            user {
                id
                name
                email
                createdAt
                updatedAt
            }
        }
    }
`