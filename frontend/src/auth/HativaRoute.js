import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {isAuthenticated} from './index';

const HativaRoute = ({component: Component, ...rest}) => (
    <Route
    {...rest}
    render ={ props =>
        isAuthenticated() && (isAuthenticated().user.validated===true) && ((isAuthenticated().user.role === "0")||(isAuthenticated().user.role === "2")||(isAuthenticated().user.role === "3")||(isAuthenticated().user.role === "4")) ? (
            <Component {...props} />
        ) : (
            <Redirect to = {{
                pathname:"signin",
                state: {from: props.location}

            }}
            />
        )

    }
    />
)
export default HativaRoute;