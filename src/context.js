import React, { useState, useEffect, useContext } from 'react'
import { auth,  db, googleProvider, facebookProvider, twitterProvider } from './config'


const AuthContext = React.createContext()



const AuthProvider = ({children}) => {
const [user, setUser] = useState()
const [loading, setLoading] = useState(true)

 function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

 function login(email, password) {
     return auth.signInWithEmailAndPassword(email, password)
 }

  function signInWithGoogle()  {
    return auth.signInWithPopup(googleProvider)
  }

  function signInWithFacebook() {
    return auth.signInWithPopup(facebookProvider)
  }
  function signInWithTwitter() {
    return auth.signInWithPopup(twitterProvider)
  }

  function logout() {
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {

      setUser(user)
      setLoading(false)

    })

    return unsubscribe
  }, [])

    return <AuthContext.Provider value={{
       user,
       signup,
       db,
       login,
       signInWithGoogle,
       signInWithFacebook,
       signInWithTwitter,
       logout
    }}>
{
   !loading && children
}
    </AuthContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AuthContext)
}

export default AuthProvider