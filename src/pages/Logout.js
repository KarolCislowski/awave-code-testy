import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { auth } from 'reducers/auth'
import {
  Row,
  Col,
  Button
} from 'react-bootstrap'

export const Logout = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogOut = () => {
    window.localStorage.removeItem('token')
    dispatch(auth.actions.logout())
    history.push('/')
  }

  return (
    <Row className="justify-content-md-center">
      <Col md={4} className="justify-content-md-center">
        <h4>See you soon! <Button onClick={handleLogOut}>Logout</Button></h4>
      </Col>
    </Row>
  )
}