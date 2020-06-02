import React from 'react'
import { Container } from 'react-bootstrap'
// Router imports
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import {
  PrivateRouteUser,
  PublicRouteUser
} from 'util/auth'

// Redux imports
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { auth } from 'reducers/auth'

import { Navigation } from 'components/Navigation'
import { Home } from 'pages/Home'
import { Signup } from 'pages/Signup'
import { Login } from 'pages/Login'
import { Profile } from 'pages/Profile'
import { Logout } from 'pages/Logout'

// Redux config
const reducer = combineReducers({
  auth: auth.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <Container>
          <Switch>
            <Route path="/users" exact>
              <Home />
            </Route>
            <Route path="/logout" exact>
              <Logout />
            </Route>
            <PublicRouteUser path="/sign-up" exact>
              <Signup />
            </PublicRouteUser>
            <Route path="/login" exact>
              <Login />
            </Route>
            <PrivateRouteUser path="/profile" exact>
              <Profile />
            </PrivateRouteUser>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
      </Router>
    </Provider>
  )
}
