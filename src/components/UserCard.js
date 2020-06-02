import React from 'react'

import {
  Card,
  Col
} from 'react-bootstrap'

export const UserCard = ({ email, first_name, last_name, avatar }) => {

  return (
    <Col xs={12} sm={12} md={6} lg={3}>
      <Card>
        <Card.Img variant="top" src={avatar} />
        <Card.Body>
          <Card.Title style={{ height: '4rem' }}>{first_name} {last_name}</Card.Title>
          <Card.Text>
            {email}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}