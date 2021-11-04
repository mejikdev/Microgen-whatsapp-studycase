import {
  MutationHookOptions,
  QueryHookOptions,
  QueryResult,
  SubscriptionHookOptions,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/react-hooks"
import { FetchResult } from "apollo-boost"
import { gql } from "graphql-tag"

// TODO dynamic limit get messages
const query = {
  getChat: gql`
    query getMessages($conversationId: String) {
      messages(where: { conversationId: $conversationId }, limit: 50) {
        id
        text
        file
        status
        createdAt
        createdBy {
          id
        }
        recipient {
          id
          firstName
        }
        conversation {
          id
        }
      }
    }
  `,
  sendChat: gql`
    mutation sendMessage($text: Text, $file: Upload, $recipientId: String, $conversationId: String) {
      createMessage(input: { text: $text, file: $file, recipientId: $recipientId, conversationId: $conversationId }) {
        id
        text
        file
        status
        createdAt
        createdBy {
          id
        }
        recipient {
          id
          firstName
        }
        conversation {
          id
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
        status
        createdAt
        createdBy {
          id
        }
        recipient {
          id
          firstName
        }
        conversation {
          id
        }
      }
    }
  `,
  deleteChat: gql`
    mutation deleteMessage($id: String!) {
      deleteMessage(id: $id) {
        id
      }
    }
  `,
}

type ChatQueryResult = QueryResult<
  {
    messages: Message[]
  },
  Record<string, User>
>

type ChatMutationResult = {
  sendChat: (options: MutationHookOptions) => Promise<FetchResult<{ createMessage: Message }>>
  deleteChat: (options: MutationHookOptions) => Promise<FetchResult<{ deleteMessage: Message }>>
}

function ChatsQuery(options: QueryHookOptions): ChatQueryResult {
  const chats = useQuery<{ messages: Message[] }>(query.getChat, options)
  return chats
}

function ChatMutation(): ChatMutationResult {
  const [sendChat] = useMutation<{ createMessage: Message }>(query.sendChat)
  const [deleteChat] = useMutation<{ deleteMessage: Message }>(query.deleteChat)
  return { sendChat, deleteChat }
}

// subcription expect result
function ChatSubcription(options: SubscriptionHookOptions) {
  const chatSub = useSubscription<{ messageAdded: Message }>(query.subcriptionChat, options)
  return chatSub
}

export { ChatMutation, ChatsQuery, ChatSubcription }
