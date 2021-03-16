import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useGlobalContext } from '../context'
import './Login.css'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useGlobalContext()
  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      await login(email, password)
      history.push("/")
    } catch{

    }
    
    
  }
    return (
        <div className="login">
            <h2 className="heading">
                Login
            </h2>
           
            <Form className="form" onSubmit = {handleSubmit}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
  </Form.Group>
  <Button variant="primary" type="submit">
    Login
  </Button>
  <Link to="signup">
      SignUp
  </Link>
</Form>
        </div>
    )
}

export default Login
