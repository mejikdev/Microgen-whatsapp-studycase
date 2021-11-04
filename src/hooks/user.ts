import { MutationHookOptions, QueryResult, useMutation, useQuery } from "@apollo/react-hooks"
import { FetchResult } from "apollo-boost"
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
  changeProfile: gql`
    mutation changeProfile($firstName: String, $avatar: Upload) {
      changeProfile(input: { firstName: $firstName, avatar: $avatar }) {
        id
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

type UserMutationResult = {
  changeProfile: (options: MutationHookOptions) => Promise<FetchResult<User>>
}

function UserQuery(): UserQueryResult {
  return useQuery<{ user: User }>(query.checkLoggedIn)
}

function UserMutation(): UserMutationResult {
  const [changeProfile] = useMutation<User>(query.changeProfile)
  return { changeProfile }
}

export { UserMutation, UserQuery }
