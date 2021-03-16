import React from 'react'
import { Route, Redirect } from "react-router-dom"
import { useGlobalContext } from '../context'





function PrivateRoute({ component: Component, ...rest }) {

    const { user } = useGlobalContext()
    return (
        <Route
        {...rest}
        render = {
            props => {
                return user ? <Component {...props} />:<Redirect to="/login" />
            }
        }
        ></Route>
    )
}

export default PrivateRoute
