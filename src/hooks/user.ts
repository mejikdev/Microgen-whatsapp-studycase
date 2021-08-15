import { QueryResult, useMutation, useQuery } from "@apollo/react-hooks"
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

function UserQuery(): UserQueryResult {
  return useQuery<{ user: User }>(query.checkLoggedIn)
}

function UserMutation() {
  const [changeProfile] = useMutation<User>(query.changeProfile)
  return { changeProfile }
}

export { UserMutation, UserQuery }
