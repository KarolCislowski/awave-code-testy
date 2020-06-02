/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import {
  Form,
  Button,
  Row,
  Col
} from 'react-bootstrap'

export const Profile = () => {
  const [id] = useState(localStorage.token.split('X')[1])
  const [email, setEmail] = useState()
  const [first_name, setfirst_name] = useState()
  const [last_name, setlast_name] = useState()
  const [avatar, setavatar] = useState()
  const [url, seturl] = useState()
  const [company, setcompany] = useState()
  const [text, settext] = useState()

  useEffect(() => {
    if (window.localStorage.token) {
      fetch(`https://reqres.in/api/users/${id}`)
        .then((res) => res.json())
        .then((json) => {
          setEmail(json.data.email)
          setfirst_name(json.data.first_name)
          setlast_name(json.data.last_name)
          setavatar(json.data.avatar)
          seturl(json.ad.url)
          setcompany(json.ad.company)
          settext(json.ad.text)
        })
    }
  }, [id])

  const handleChange = (e, callback) => {
    callback(e.target.value)
  }

  const urlUpdate = `https://reqres.in/api/users/${id}`

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(urlUpdate, {
      method: 'put',
      body: JSON.stringify({
        data: {
          id,
          email,
          first_name,
          last_name,
          avatar
        },
        ad: {
          company,
          url,
          text
        }
      }),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return (
    <Row className="justify-content-md-center">
      <Form as={Col} md={4}>
        <h4>Edit your Profile</h4>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control required type="email" value={email} onChange={(e) => handleChange(e, setEmail)} />
        </Form.Group>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control required type="text" value={first_name} onChange={(e) => handleChange(e, setfirst_name)} />
        </Form.Group>
        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control required type="text" value={last_name} onChange={(e) => handleChange(e, setlast_name)} />
        </Form.Group>
        <Form.Group controlId="formBasicAvatar">
          <Form.Label>Avatar:</Form.Label>
          <Form.Control required type="text" value={avatar} onChange={(e) => handleChange(e, setavatar)} />
        </Form.Group>
        <Form.Group controlId="formBasicUrl">
          <Form.Label>URL:</Form.Label>
          <Form.Control required type="text" value={url} onChange={(e) => handleChange(e, seturl)} />
        </Form.Group>
        <Form.Group controlId="formBasicCompany">
          <Form.Label>Company:</Form.Label>
          <Form.Control required type="text" value={company} onChange={(e) => handleChange(e, setcompany)} />
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Label>Motto:</Form.Label>
          <Form.Control required type="text" value={text} onChange={(e) => handleChange(e, settext)} />
        </Form.Group>
        <Row className="justify-content-end">
          <Button type="submit" onClick={handleSubmit}>Update</Button>
        </Row>
      </Form>
    </Row>
  )
}