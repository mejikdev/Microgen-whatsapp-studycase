import React from "react"

import ApolloProvider from "./ApolloProvider"
import Routes from "./Routes"

const App: React.FC = () => {
  return (
    <div className="App">
      <ApolloProvider>
        <Routes />
      </ApolloProvider>
    </div>
  )
}

export default App
