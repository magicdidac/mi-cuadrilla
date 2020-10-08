import React, { useState } from 'react'
import { TextField, Button, Typography } from '@material-ui/core'
import { useStyle } from './LoginStyle'
import logo from '../logo.svg'

export const Login = (props) => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [submitted, setSubmitted] = useState(false)

    const style = useStyle()

    const login = (event) => {
        event.preventDefault()
        setSubmitted(true)
    }

    return (
        <div>
            <div className={style.paper}>
                <img alt='logo' className={style.logo} src={logo} />
                <Typography className={style.title} variant='h3'>Mi Cuadrilla</Typography>
                <div className={style.backForm}>
                    <form className={style.form} onSubmit={login} noValidate={false}>
                        <TextField label='Usuario'
                        InputLabelProps={{className: style.field_label}}
                        InputProps={{className: style.field_input}}
                        onChange={ (ev)=> setUsername(ev.target.value)}/>
                        <TextField className={style.field} type='password' label='Contraseña'
                        InputLabelProps={{className: style.field_label}}
                        InputProps={{className: style.field_input}}
                        onChange={ (ev)=> setPassword(ev.target.value)}/>
                        <Button disabled={submitted} variant='contained' className={style.buttons} type='submit'>Iniciar sesión</Button>
                    </form> 
                </div>
            </div>
        </div>
    )
}
