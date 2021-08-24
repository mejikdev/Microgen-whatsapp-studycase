import { MutationHookOptions, useMutation } from "@apollo/react-hooks"
import { FetchResult } from "apollo-boost"
import gql from "graphql-tag"

const query = {
  subcribe: gql`
    mutation subcribeNotification($playerId: String!, $segment: String) {
      subscribePushNotificatiton(input: { playerId: $playerId, segment: $segment }) {
        message
      }
    }
  `,
}

interface NotificationVariables {
  playerId: string
  segment: string
}

type NotificationMutationResult = {
  subscribe: (
    options: MutationHookOptions<{ response: string }, NotificationVariables>,
  ) => Promise<FetchResult<{ response: string }>>
}

function useNotification(): NotificationMutationResult {
  const [subscribe] = useMutation<{ response: string }, NotificationVariables>(query.subcribe)
  return { subscribe }
}

export default useNotification
