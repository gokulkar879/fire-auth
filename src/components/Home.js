import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { db } from '../config'
import { useGlobalContext } from '../context'
import { useHistory } from 'react-router'
// import { Button } from 'react-bootstrap'

function Home() {
    const { user, logout } = useGlobalContext()
    const [name, setName] = useState({})
    console.log(user)
    const history = useHistory()
    const handleClick =async (e) => {
       try{
       await logout();
history.push("/login")
       } catch{

       }
    }
    useEffect(() => {
     const docref = db.collection("users").doc(user.uid);
     docref.get().then(res =>{
         setName({
             first: name.firstName,
             last: name.lastName
         })
     })
    },[])
    return (
        <div>
            <Button onClick={handleClick}>Log Out</Button>
        </div>
    )
}

export default Home
