import React, { useState } from 'react'
import 'firebase/auth'
import { useFirebaseApp, useUser } from 'reactfire'
import { TextField, Button, Typography } from '@material-ui/core'
import { useStyle } from './LoginStyle'
import logo from '../logo.svg'
import loadingLogo from '../assets/loading.svg'

export const Login = (props) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const style = useStyle()
    const firebase = useFirebaseApp()
    const user = useUser()

    const login = (event) => {
        event.preventDefault()
        setLoading(true)
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{
            props.history.push('/');
        })
        .catch((e) => {
            setLoading(false)
            setError(true)
        })
    }

    const logout = async () => {
        setError(false)
        await firebase.auth().signOut()
    }

    return (
        <div>
            <div className={style.paper}>
                <img alt='logo' className={style.logo} src={logo} />
                <Typography className={style.title} variant='h3'>Mi Cuadrilla</Typography>
                {user && <p>Logged</p>}
                { !loading ?
                    <div className={style.backForm}>
                        <form className={style.form} onSubmit={login} noValidate={false}>
                            <TextField error={error} type='email' label='Email'
                            InputLabelProps={{className: style.field_label}}
                            InputProps={{className: style.field_input}}
                            onChange={ (ev)=> setEmail(ev.target.value)}/>
                            <TextField className={style.field} error={error} type='password' label='Contraseña'
                            InputLabelProps={{className: style.field_label}}
                            InputProps={{className: style.field_input}}
                            onChange={ (ev)=> setPassword(ev.target.value)}/>
                            <Button variant='contained' className={style.buttons} type='submit'>Iniciar sesión</Button>
                            <Button variant='contained'className={style.buttons} onClick={logout}>Cerrar sesión</Button>
                        </form> 
                    </div>:
                    <div className={style.form}>
                        <img alt='loading' src={loadingLogo}/>
                        <Typography variant='h5' className={style.title}>Iniciando sesión...</Typography>
                    </div>
                }
            </div>
        </div>
    )
}
