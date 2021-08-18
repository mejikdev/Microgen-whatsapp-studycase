import { QueryHookOptions, QueryResult, useQuery } from "@apollo/react-hooks"
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
        people(where: { id_not: $userId }) {
          id
          firstName
          avatar
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

function ListChatQuery(options: QueryHookOptions): ListChatsQueryResult {
  const get = useQuery<{ conversations: [Conversation] }>(query.getChats, options)
  return get
}

export { ListChatQuery }
