import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRouteUser = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => (window.localStorage.token ? (
        children
      )
        : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }} />
        ))} />
  )
}

export const PublicRouteUser = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => (!window.localStorage.token ? (
        children
      )
        : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }} />
        ))} />
  )
}