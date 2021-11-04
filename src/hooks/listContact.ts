import { QueryHookOptions, QueryResult, useQuery } from "@apollo/react-hooks"
import { gql } from "graphql-tag"
const query = {
  getContact: gql`
    query getContact($userId: String) {
      users(where: { id_not: $userId, role: AUTHENTICATED, firstName_not: "", phoneNumber_not: null }) {
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

function ContactQuery(options: QueryHookOptions): UsersQueryResult {
  const get = useQuery<{ users: [User] }>(query.getContact, options)
  return get
}

export { ContactQuery }
