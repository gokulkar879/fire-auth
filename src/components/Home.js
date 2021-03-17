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

    const history = useHistory()
    const fetchData = () => {
       setName(user.displayName)
       
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
     
    },[])
    return (
        <div className="home">
           <div className="card">
               <h3>{name}</h3>
               <Button onClick={handleClick}>Log Out</Button>
           </div>
                
            
            
        </div>
    )
}

export default Home
