import React, { useState } from 'react'
import {
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  Button,
} from "react-bootstrap"
//import useRouter from 'hooks/useRouter'
//import { useProvideAuth } from 'hooks/useAuth'
//import { LandingHeader, LoadingSpinner } from 'components'
//import { setAuthToken } from 'utils/axiosConfig'
//import AvatarPicker from 'components/AvatarPicker/AvatarPicker'
//import { toast } from 'react-toastify'


const initialState = {
    username: '',
    email: '',
    password: '',
    isSubmitting: false,
    errorMessage: null,
}


export default function RegisterPage() {
    const [data, setData] = useState(initialState)


    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name] : event.target.value,
        })
        console.log(data)
    }

    return (
        <div className="register">
          <Form>
            <Form.Group size="lg" controlId="username">
            <Form.Label>Username: </Form.Label>
            <Form.Control 
              autoFocus
              type = "username"
              value= {data.username}
              onChange = {(e) => handleInputChange(e.target.value)}
            />
            </Form.Group>
            <Form.Group size="lg" controlId="password" class="passWordForm">
              <Form.Label class="password">Password: </Form.Label>
              <Form.Control
                type="password"
                value={data.password}
                onChange = {(e) => handleInputChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="confirm" class="passWordForm">
              <Form.Label class="confirm">Confirm Password: </Form.Label>
              <Form.Control
                type="password"
                value={data.password}
                onChange = {(e) => handleInputChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="email" class="emailForm">
              <Form.Label class="confirm">Confirm Password: </Form.Label>
              <Form.Control
                type="email"
                value={data.email}
                onChange = {(e) => handleInputChange(e.target.value)}
              />
            </Form.Group>
            <Button block size="lg" type="submit" class="button">Register</Button>
          </Form>
        </div>
    )
}