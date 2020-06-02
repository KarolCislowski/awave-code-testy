import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from 'reducers/auth'
import { useHistory } from 'react-router-dom'
import {
  Form,
  Button,
  Row,
  Col,
  Nav
} from 'react-bootstrap'

export const Signup = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorUser, setErrorUser] = useState()
  const [errorPassword, setErrorPassword] = useState()
  const history = useHistory()

  const url = `https://reqres.in/api/register`

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorUser()
    setErrorPassword()
    fetch(url, {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      return res.json()
    }).then(({ token, error }) => {
      if (token) {
        window.localStorage.setItem('token', token)
        dispatch(auth.actions.login())
      } else {
        throw new Error(error)
      }
    }).then(() => history.push('/'))
      .catch((error) => {
        if (error.message[0] === 'M') {
          setErrorPassword(error.message)
        } else {
          setErrorUser(error.message)
        }
      })
  }
  const handleChange = (e, callback) => {
    callback(e.target.value)
  }

  return (
    <Row className="justify-content-md-center">
      <Form as={Col} md={4}>
        <h4>Sign up</h4>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => handleChange(e, setEmail)} />
          {errorUser && <p className="error">* You need to use email from users list</p>}
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => handleChange(e, setPassword)} />
          {errorPassword && <p className="error">* Password is required</p>}
        </Form.Group>
        <Row className="justify-content-end">
          <Button type="submit" onClick={handleSubmit}>Sign Up</Button>
          <Nav.Link href="/login">Or log in here</Nav.Link>
        </Row>
      </Form>
    </Row>
  )
}