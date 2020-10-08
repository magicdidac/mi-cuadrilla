import React from 'react'
import { Button } from '@material-ui/core'

export const Home = (props) => {

    const logoutHandler = async () => {
        // TODO
        props.history.push('/login')
    }

    return (
        <div>
            <Button variant='contained' onClick={logoutHandler}>Cerrar sesión</Button>
        </div>
    )
}
