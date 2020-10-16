import React from 'react'
import { Button } from '@material-ui/core'
import { inject, observer} from 'mobx-react'
import { signOut } from '../Actions/Auth'

export const Home = inject("UserStore")(observer((props) => {

    const logoutHandler = async () => {
        signOut(props.UserStore)
    }

    return (
        <div>
            <Button variant='contained' onClick={logoutHandler}>Cerrar sesión</Button>
        </div>
    )
}))
