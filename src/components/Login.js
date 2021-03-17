
import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useGlobalContext } from '../context'
import './Login.css'


function Login() {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, signInWithGoogle, db, signInWithTwitter, signInWithFacebook } = useGlobalContext()
  const history = useHistory()


  const handleSignInWithGoogle = async (e) => {     //google sign in handler
    e.preventDefault()
    try {
     let res = await signInWithGoogle()
    //  console.log(res)
     let newUser = res.additionalUserInfo.isNewUser
     if(newUser) {
       console.log(res)
      db.collection("users").doc(res.user.uid).set({
       
        displayName: res.user.displayName,
        email: res.user.email
      })
        .then(() => history.push("/"))
     }
      history.push("/")
    } catch {

    }
  }
  const handleSignInWithFacebook = async (e) => {    //facebook sign in handler
    e.preventDefault()
    try {
      let res = await signInWithFacebook()
      let newUser = res.additionalUserInfo.isNewUser
      if(newUser) {
        // console.log(res)
       db.collection("users").doc(res.user.uid).set({
        
         displayName: res.user.displayName,
         email: res.user.email
       })
         .then(() => history.push("/"))
      }
      history.push("/")
    } catch (err) {
      setError("could not sign in")
    }
  }
  const handleSignInWithTwitter = async (e) => {    //twitter sign in handler
    e.preventDefault()
    try {
      let res = await signInWithTwitter()
      let newUser = res.additionalUserInfo.isNewUser
      if(newUser) {
        // console.log(res)
       db.collection("users").doc(res.user.uid).set({
        
         displayName: res.user.displayName,
         email: res.user.email
       })
         .then(() => history.push("/"))
      }
      history.push("/")
    } catch (err) {
      setError("could not sign in")
    }
  }



  const handleSubmit = async (e) => {       //normal email and password sign in handler
    e.preventDefault()
    try {
      await login(email, password)
      history.push("/")
    } catch {
       setError("could not sign in")
    }


  }
  return (
    <div className="login">
      <h2 className="heading">
        Login
            </h2>
      {
        error && <Alert variant="danger">{error}</Alert>
      }
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />

        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Link to="signup">
          SignUp
       </Link>
      </Form>
      <div className="buttons">
        <h3>or</h3>
        <Button onClick={handleSignInWithGoogle} variant="danger">
          google
       </Button>
        <Button onClick={handleSignInWithFacebook}>
          facebook
       </Button>
        <Button onClick={handleSignInWithTwitter} style={{ "backgroundColor": "black" }}>
          Twitter
       </Button>
      </div>


    </div>
  )
}

export default Login
