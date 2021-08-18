import { QueryResult, useQuery } from "@apollo/react-hooks"
import { gql } from "graphql-tag"

const query = {
  getChats: gql`
    query listChat($userId: String) {
      conversations(where: { peopleId: $userId }) {
        id
        name
        messages(limit: 1, orderBy: createdAt_DESC) {
          id
          text
          file
          recipient {
            id
            firstName
            avatar
          }
          createdBy {
            id
            firstName
            avatar
          }
          createdAt
        }
      }
    }
  `,
}

type ListChatsQueryResult = QueryResult<
  {
    conversations: [Conversation]
  },
  Record<string, User>
>

// !TODO fix it hardcode in variables
function ListChatsQuery({ id }: any): ListChatsQueryResult {
  const Listchats = useQuery<{ conversations: [Conversation] }>(query.getChats, {
    variables: { userId: id || "61169240afe16600347a0f0b" },
  })
  return Listchats
}

export { ListChatsQuery }
