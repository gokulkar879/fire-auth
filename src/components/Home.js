import { Button, Card } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'

import { useGlobalContext } from '../context'
import { useHistory } from 'react-router'
import { auth } from '../config'
// import { Button } from 'react-bootstrap'
import './Home.css'



function Home() {

    const { user, logout, db } = useGlobalContext()
    const [name, setName] = useState('')
    const [image, setImage] = useState('')

    const history = useHistory()
    const fetchData = async () => {
        console.log(user)
        const userRef = db.doc(`users/${user.uid}`)
        const snapshot = await userRef.get()
        if(!snapshot.exists) {
            const { email, displayName, photoURL } = user
        
        try{
       await userRef.set({
        displayName,
        email,
        photoURL,
       })
        } catch{

        }
    } else {
        const userRef = db.doc(`users/${user.uid}`)
        const snapshot = await userRef.get()

        const { email, displayName, photoURL } = user
        setName(displayName)
        setImage(photoURL)
    }
    }
    const handleClick = async (e) => {
       try{
       await logout();
history.push("/login")
       } catch{

       }
    }
    useEffect(() => {
    
     fetchData()
     
    },[image])
    return (
        <div className="home">
           <div className="card">
               <h3>{name}</h3>
               <img src={`${image}`}></img>
               <Button onClick={handleClick}>Log Out</Button>
           </div>
                
            
            
        </div>
    )
}

export default Home
