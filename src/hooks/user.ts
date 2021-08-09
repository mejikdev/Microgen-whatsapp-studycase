import { QueryResult, useQuery } from "@apollo/react-hooks"
import { gql } from "graphql-tag"
const query = {
  checkLoggedIn: gql`
    query {
      user {
        id
        firstName
        lastName
        role
        avatar
      }
    }
  `,
}

type UserQueryResult = QueryResult<
  {
    user: User
  },
  Record<string, User>
>

function UserQuery(): UserQueryResult {
  return useQuery<{ user: User }>(query.checkLoggedIn)
}

export { UserQuery }
