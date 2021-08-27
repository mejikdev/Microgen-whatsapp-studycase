import useNotification from "hooks/notification"
import { UserQuery } from "hooks/user"
import React from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"

import SplashScreen from "./components/SplashScreen"
import Home from "./pages/chat/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Verification from "./pages/Verification"

type IPrivateRoute = {
  path: string
  autheticated: boolean
  nonAuthenticatedRedirect: string
  children: React.ReactNode
}

type IPublicRoute = {
  path: string
  autheticated: boolean
  authenticatedRedirect: string
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

const PublicRoute = ({ path, autheticated, authenticatedRedirect, children }: IPublicRoute) => {
  if (autheticated) {
    return <Route render={() => <Redirect to={authenticatedRedirect} />} />
  }

  return (
    <Route exact path={path}>
      {children}
    </Route>
  )
}

function RouterProvider(): JSX.Element {
  const { data, loading, previousData } = UserQuery()
  const { subscribe } = useNotification()

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w: any = window
    w.OneSignal.isPushNotificationsEnabled(function (isEnabled: boolean) {
      if (isEnabled && !previousData && data?.user) {
        w.OneSignal.getUserId(function (userId: string) {
          subscribe({
            variables: {
              playerId: userId,
              segment: "conversation",
            },
          })
        })
      }
    })
  }, [subscribe, data?.user, previousData])

  const authenticated = Boolean(data?.user)

  if (loading) {
    return <SplashScreen />
  }

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/public" autheticated={authenticated} authenticatedRedirect="/">
          <Login />
        </PublicRoute>
        <PublicRoute path="/verification" autheticated={authenticated} authenticatedRedirect="/">
          <Verification />
        </PublicRoute>
        <PrivateRoute autheticated={authenticated} nonAuthenticatedRedirect="/public" path="/setProfile">
          <Profile user={data?.user} />
        </PrivateRoute>
        <PrivateRoute autheticated={authenticated} nonAuthenticatedRedirect="/public" path="/">
          <Home user={data?.user} />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  )
}

export default RouterProvider
