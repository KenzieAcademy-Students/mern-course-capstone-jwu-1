import React, { useState } from 'react'
import {
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  Button,
  ToastBody,
} from "react-bootstrap"
import { useProvideAuth } from 'hooks/useAuth'
//import { LandingHeader, LoadingSpinner } from 'components'
//import { setAuthToken } from 'utils/axiosConfig'
//import AvatarPicker from 'components/AvatarPicker/AvatarPicker'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import useRouter from 'hooks/useRouter'


const initialState = {
  username: '',
  email: '',
  password: '',
  isSubmitting: false,
  errorMessage: null,
}


export default function RegisterPage() {
  const [data, setData] = useState(initialState)
  const auth = useProvideAuth()
  const router = useRouter()
  const axios = require('axios');

  const handleInputChange = (event) => {
    console.log(event)
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
    console.log(data)
  }

  const handleSignup = async (event) => {
    const form = event.currentTarget
    event.preventDefault()

    console.log(data.password === document.getElementById("confirm").value)
    if (!(data.password === document.getElementById("confirm").value)) {
      toast.error("Passwords do not match")
      console.log(data)
    } else {
      setData({
        ...data,
        isSubmitting: true,
        errorMassage: null,
      })
      try {
        //const res = await auth.signup(data.username, data.email, data.password) [Do not delete]
        setData({
          ...data,
          isSubmitting: true,
          errorMessage: null,
        })
        submitRegister();
        //Need to add authentication token later

      } catch (error) {
        toast(error.message)
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message
        })
      }
    }

  }
  async function submitRegister() {
    await axios.post('/api/users', {
      username: data.username,
      password: data.password,
      email: data.email
    }).then(res => {
      toast.success("Registration successful!")
      setTimeout(function () {
        window.location.replace("/")
      }, 3000);
    }
    )
      .catch(err => {
        console.log(err.response.status)
        if (err.response.status === 409) {
          toast.error("The username or email already exists")
        }

      })
  }
  function goBack(){
    window.location.replace("/")
  }

  return (

    <div className="register">
      <Form onSubmit={handleSignup} className="register-form">
        <h2>Welcome! Register Here</h2>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username: </Form.Label>
          <Form.Control
            autoFocus
            type="username"
            name="username"
            value={data.username}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password" className="passWordForm">
          <Form.Label className="password">Password: </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={data.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group size="lg" className="passWordForm">
          <Form.Label className="confirm">Confirm Password: </Form.Label>
          <Form.Control
            type="password"
            id="confirm"
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email" className="emailForm">
          <Form.Label className="confirm">Email: </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={data.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
        <Button block size="lg" type="submit" className="button" onClick={goBack}>Back</Button>
        <Button block size="lg" type="submit" className="button">Register</Button>
        </Form.Group>
        
      </Form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}