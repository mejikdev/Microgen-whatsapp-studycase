import { UserQuery } from "hooks/user"
import React from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"

import SplashScreen from "./components/SplashScreen"
import Chat from "./pages/Chat"
import Contact from "./pages/Contact"
import Home from "./pages/Home"
import ListChat from "./pages/ListChat"
import Profile from "./pages/Profile"
import Verification from "./pages/Verification"

type IPrivateRoute = {
  path: string
  autheticated: boolean
  nonAuthenticatedRedirect: string
  children: React.ReactNode
}

const PrivateRoute = ({ path, autheticated, nonAuthenticatedRedirect, children }: IPrivateRoute) => {
  if (!autheticated) {
    return <Route render={() => <Redirect to={nonAuthenticatedRedirect} />} />
  }

  return (
    <Route exact path={path}>
      {children}
    </Route>
  )
}

function RouterProvider(): JSX.Element {
  const { data, loading } = UserQuery()

  const authenticated = Boolean(data?.user)
  // const a = 1

  if (loading) {
    return <SplashScreen />
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/public">
          <Home />
        </Route>
        <Route exact path="/verification">
          <Verification />
        </Route>
        <PrivateRoute autheticated={authenticated} nonAuthenticatedRedirect="/public" path="/setProfile">
          <Profile user={data?.user} />
        </PrivateRoute>
        <PrivateRoute autheticated={authenticated} nonAuthenticatedRedirect="/public" path="/chat">
          <Chat user={data?.user} />
        </PrivateRoute>
        <PrivateRoute autheticated={authenticated} nonAuthenticatedRedirect="/public" path="/contact">
          <Contact user={data?.user} />
        </PrivateRoute>
        <PrivateRoute autheticated={authenticated} nonAuthenticatedRedirect="/public" path="/">
          <ListChat user={data?.user} />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  )
}

export default RouterProvider
