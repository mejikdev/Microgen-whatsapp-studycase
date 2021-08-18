import {
  MutationResult,
  QueryHookOptions,
  QueryResult,
  SubscriptionHookOptions,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/react-hooks"
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
    mutation sendMessage($text: Text, $recipientId: String) {
      createMessage(input: { text: $text, recipientId: $recipientId }) {
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
  subcriptionChat: gql`
    subscription MessageAdded($conversationId: String) {
      messageAdded(where: { conversationId: $conversationId }) {
        id
        text
        file
        createdAt
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

function ChatsQuery(options: QueryHookOptions): ChatQueryResult {
  const chats = useQuery<{ conversation: Conversation }>(query.getChat, options)
  return chats
}

function ChatMutation() {
  const [sendChat] = useMutation<{ createMessage: Message }>(query.sendChat)
  return { sendChat }
}

function ChatSubcription(options: SubscriptionHookOptions) {
  const chatSub = useSubscription<{ messageAdded: Message }>(query.subcriptionChat, options)
  return chatSub
}

export { ChatMutation, ChatsQuery, ChatSubcription }
