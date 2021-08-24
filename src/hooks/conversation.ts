import { QueryHookOptions, QueryResult, SubscriptionHookOptions, useQuery, useSubscription } from "@apollo/react-hooks"
import { gql } from "graphql-tag"

const query = {
  getConversations: gql`
    query getConversations($userId: String) {
      conversations(where: { peopleId: $userId }, orderBy: createdAt_DESC) {
        id
        name
        unreadedMessageCount
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
  subcriptionConversation: gql`
    subscription ($conversationId: [MessageFilter]) {
      messagesAdded(or: $conversationId) {
        id
        text
        file
        createdAt
        conversation {
          id
        }
      }
    }
  `,
}

type ConversationQueryResult = QueryResult<
  {
    conversations: Conversation[]
  },
  Record<string, User>
>

function useConversationQuery(options: QueryHookOptions): ConversationQueryResult {
  return useQuery<{ conversations: Conversation[] }>(query.getConversations, options)
}

function useConversationSubcription(options: SubscriptionHookOptions) {
  return useSubscription<{ messagesAdded: Message[] }>(query.subcriptionConversation, options)
}

export { useConversationQuery, useConversationSubcription }
