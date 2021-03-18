
import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { db } from '../config'
import { useGlobalContext } from '../context'
import './SignUp.css'


function SignUp() {
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [file, setFile] = useState(null)
     

    const { signup, storageRef, auth} = useGlobalContext()

    const history = useHistory()
 
    const handleSubmit = async (e) => {
        e.preventDefault()
     
      
      try{
        setError('')
        const newUser = await signup(email, password)
       
        const userRef = db.doc(`users/${newUser.uid}`)
        const snapshot = await userRef.get()
        if(!snapshot.exists) {
            const {displayName, email, photoURL} = newUser
        
        try{
       await userRef.set({
        displayName,
        email,
        photoURL:null,
       })
        } catch{

        }
        history.push("/")

      }
     } catch{
          setError('failed to create a account')
      }
    }

    
        return (
        <div className="signup">
                   <h2 className="heading">
               SignUp
            </h2>
            {
                error && <Alert variant="danger">{error}</Alert>
            }
            <Form className="form" onSubmit={handleSubmit}>
            <Form.Label>First Name</Form.Label>
    <Form.Control type="text" placeholder="Enter your firstname" className="text" value={first} onChange={(e) => setFirst(e.target.value)}/>
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="text" placeholder="Enter last name" className="text" value={last} onChange={(e) => setLast(e.target.value)}/>
    
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
  </Form.Group>
  
  <Button variant="primary" type="submit">
    SignUp
  </Button>
  <Link to="/login">
      Login
  </Link>
</Form>

        </div>
    )
}

export default SignUp
