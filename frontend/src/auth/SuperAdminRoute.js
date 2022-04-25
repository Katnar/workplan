import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {isAuthenticated} from './index';

const SuperAdminRoute = ({component: Component, ...rest}) => (
    <Route
    {...rest}
    render ={ props =>
        isAuthenticated() && (isAuthenticated().user.validated===true) && isAuthenticated().user.role === "5" ? (
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
export default SuperAdminRoute;