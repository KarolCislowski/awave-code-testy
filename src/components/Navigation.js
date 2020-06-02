import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from 'reducers/auth'

import {
  Navbar,
  Nav
} from 'react-bootstrap'

export const Navigation = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [photo, setPhoto] = useState('')
  const [name, setName] = useState('')

  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  )

  useEffect(() => {
    if (window.localStorage.token) {
      fetch(`https://reqres.in/api/users/${localStorage.token.split('X')[1]}`)
        .then((res) => res.json())
        .then((json) => {
          setPhoto(json.data.avatar)
          setName(json.data.first_name)
        })
    }
  }, [isAuthenticated])


  if (window.localStorage.token) {
    dispatch(auth.actions.login())
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('token')
    dispatch(auth.actions.logout())
    history.push('/')
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Awave Test</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/users">Users</Nav.Link>
        </Nav>
        {!isAuthenticated && <Nav>
          <Nav.Link href="/login">LogIn</Nav.Link>
          <Nav.Link href="/sign-up">SignUp</Nav.Link>
        </Nav>}
        {isAuthenticated && <>
          {photo.length > 0 && <img className="img-small" src={photo} alt="avatar" />}
          <Nav>
            {name.length > 0 && <Nav.Link href="/profile">Profile: {name}</Nav.Link>}
            <Nav.Link onClick={handleLogOut}>LogOut</Nav.Link>
          </Nav>
        </>}
      </Navbar.Collapse>
    </Navbar>
  )
}