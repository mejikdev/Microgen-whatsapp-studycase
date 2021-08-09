import { ApolloProvider } from "@apollo/react-hooks"
import { ApolloClient, InMemoryCache } from "apollo-boost"
import { split } from "apollo-link"
import { setContext } from "apollo-link-context"
import { WebSocketLink } from "apollo-link-ws"
import { createUploadLink } from "apollo-upload-client"
import { getMainDefinition } from "apollo-utilities"
import { parseCookies } from "nookies"
import React, { useMemo } from "react"

export { setContext } from "apollo-link-context"

type ApolloProps = {
  children: React.ReactNode
}

const { REACT_APP_MICROGEN_GRAPHQL_URL, REACT_APP_MICROGEN_SUBCRIPTION_URL } = process.env

const Apollo = (props: ApolloProps): JSX.Element => {
  if (!REACT_APP_MICROGEN_GRAPHQL_URL || !REACT_APP_MICROGEN_SUBCRIPTION_URL) {
    throw new Error("environment variable hasn't set yet")
  }

  const url = REACT_APP_MICROGEN_GRAPHQL_URL
  const cookies = parseCookies()
  const token = cookies.token ? "Bearer " + cookies.token : ""

  const authLink = setContext((request, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token,
      },
    }
  })

  const wsLink = new WebSocketLink({
    uri: REACT_APP_MICROGEN_SUBCRIPTION_URL,
    options: {
      reconnect: true,
      connectionParams: {
        Authorization: token,
        authToken: token,
      },
    },
  })

  const httpsLink = authLink.concat(createUploadLink({ uri: url }) as never)

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query)

      return definition.kind === "OperationDefinition" && definition.operation === "subscription"
    },
    wsLink,
    httpsLink,
  )

  const client = useMemo(
    () =>
      new ApolloClient({
        link: link,
        cache: new InMemoryCache(),
      }),
    [link],
  )

  return <ApolloProvider client={client as never}>{props.children}</ApolloProvider>
}

export default Apollo
