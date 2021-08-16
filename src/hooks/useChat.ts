import { QueryResult, useQuery } from "@apollo/react-hooks"
import { gql } from "graphql-tag"

const query = {
  getChats: gql`
    query getListChat($userId: String) {
      rooms(where: { peopleId: $userId }) {
        id
        chats(orderBy: createdAt_DESC, limit: 1) {
          id
          message
          sender {
            id
            firstName
            avatar
          }
          recipient {
            id
            firstName
            avatar
          }
          file
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
