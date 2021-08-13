import { QueryResult, useQuery } from "@apollo/react-hooks"
import { gql } from "graphql-tag"

const query = {
  getChats: gql`
    query getChatsByRoom($userId: String) {
      rooms {
        id
        chats(or: [{ toUserId: $userId }, { createdBy: { id: $userId } }], orderBy: createdAt_DESC) {
          id
          message
          createdAt
          toUser {
            id
            firstName
          }
          createdBy {
            id
            firstName
          }
        }
      }
    }
  `,
}

type ChatQueryResult = QueryResult<
  {
    rooms: [Room]
  },
  Record<string, User>
>

function ChatQuery({ id }: any): ChatQueryResult {
  const chats = useQuery<{ rooms: [Room] }>(query.getChats, { variables: { userId: id } })
  return chats
}

export { ChatQuery }
