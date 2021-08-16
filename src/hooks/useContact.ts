import { QueryResult, useQuery } from "@apollo/react-hooks"
import { gql } from "graphql-tag"
const query = {
  getContact: gql`
    query getContact($userId: String) {
      users(where: { id_not: $userId, role: AUTHENTICATED }) {
        id
        firstName
        phoneNumber
        avatar
      }
    }
  `,
}

type UsersQueryResult = QueryResult<
  {
    users: [User]
  },
  Record<string, User>
>

function UsersQuery(id: any): UsersQueryResult {
  return useQuery<{ users: [User] }>(query.getContact, { variables: { userId: id } })
}

export { UsersQuery }
