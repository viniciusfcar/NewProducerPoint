import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLogged } from '../services/auth'

const RouteHandler = ({ children, ...routeProps }) => {

    const logged = isLogged()
    const authorized = (routeProps.private && !logged) ? false : true

    return (
        <Route {...routeProps}
            render={() =>
                authorized ? children : <Redirect to='/' />
            }
        />
    );
}

export default RouteHandler