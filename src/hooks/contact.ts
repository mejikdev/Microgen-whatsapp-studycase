import { QueryHookOptions, QueryResult, useQuery } from "@apollo/react-hooks"
import { gql } from "graphql-tag"
const query = {
  getContact: gql`
    query getContacts($userId: String) {
      contacts(where: { userId: $userId, users: { id_not: $userId } }) {
        id
        users {
          id
          firstName
          avatar
          phoneNumber
        }
      }
    }
  `,
}

type ContactsQueryResult = QueryResult<
  {
    contacts: [Contact]
  },
  Record<string, Contact>
>

function ContactQuery(options: QueryHookOptions): ContactsQueryResult {
  const get = useQuery<{ contacts: [Contact] }>(query.getContact, options)
  return get
}

export { ContactQuery }
