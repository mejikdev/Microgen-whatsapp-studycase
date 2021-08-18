import { QueryResult, useMutation, useQuery } from "@apollo/react-hooks"
import { gql } from "graphql-tag"

const query = {
  getChat: gql`
    query getChats($conversationId: String!) {
      conversation(id: $conversationId) {
        id
        name
        messages {
          id
          text
          file
          recipient {
            id
            firstName
          }
          createdBy {
            id
            firstName
          }
          createdAt
        }
        createdAt
      }
    }
  `,
  sendChat: gql`
    mutation sendMessage($text: Text, $recepientId: String) {
      createMessage(input: { text: $text, recipientId: $recepientId }) {
        id
        text
        file
        recipient {
          id
          firstName
        }
        conversation {
          id
          people {
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
    conversation: Conversation
  },
  Record<string, User>
>

// !TODO fix it hardcode in variables
function ChatQuery({ id }: any): ChatQueryResult {
  const chats = useQuery<{ conversation: Conversation }>(query.getChat, {
    variables: { conversationId: id || "611c7ca016c0b50033bac416" },
  })
  return chats
}

function ChatMutation() {
  const [sendChat] = useMutation<{ createMessage: Message }>(query.sendChat)
  return { sendChat }
}

export { ChatMutation, ChatQuery }
