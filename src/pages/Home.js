import React, { useState, useEffect } from 'react'
import {
  Container,
  CardGroup,
  Row,
  Pagination
} from 'react-bootstrap'

import { UserCard } from 'components/UserCard'

export const Home = () => {
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(1)

  const items = []
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item value={number} key={number} active={number === page} onClick={() => setPage(number)}>
        {number}
      </Pagination.Item>
    )
  }

  const url = `https://reqres.in/api/users?page=${page}`

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data)
        setTotalPages(data.total_pages)
      })
  }, [url, page])

  return (
    <Container>
      <CardGroup>
        {users.length > 0
          && <>
            {users.map((e) => (
              <UserCard
                key={e.id}
                first_name={e.first_name}
                last_name={e.last_name}
                email={e.email}
                avatar={e.avatar}
              />))}
          </>}
      </CardGroup>
      <Row className="justify-content-md-center">
        <Pagination>
          {items}
        </Pagination>
      </Row>
    </Container>
  )
}