import { gql } from "@apollo/client";

export const LIST_IDEAS = gql`
    query ListIdeas {
    listIdea {
        id
        title
        description
        countVotes
        createdAt
        updatedAt
        author {
        id
        email
        name
        }
        comments {
        id
        ideaId
        content
        authorId
        updatedAt
        createdAt
        author {
            name
            email
        }
        }
        votes {
        id
        userId
        }
    }
}
`

export const GET_IDEA = gql`
query GetIdea($ideaId: String!) {
  getIdea(ideaId: $ideaId) {
    authorId
    countVotes
    createdAt
    description
    id
    title
    updatedAt
    author {
      createdAt
      email
      id
      name
      password
      updatedAt
    }
    comments {
      authorId
      content
      createdAt
      id
      author {
        email
        name
      }
    }
    votes {
      id
      ideaId
      userId
    }
  }
}
`