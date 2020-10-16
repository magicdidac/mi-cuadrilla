import React, { useState } from 'react'
import { TextField, Button, Typography } from '@material-ui/core'
import { useStyle } from './NewPasswordStyle'
import logo from '../logo.svg'
import { showNotification } from '../utils/notification'
import { setNewPassword } from '../Actions/Auth'
import { inject } from 'mobx-react'

export const NewPassword = inject('UserStore')((props) => {

    const style = useStyle()

    const [password, setPassword] = useState('') 
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const changePassword = (event) => {
        event.preventDefault()

        if(password !== confirmedPassword){
            let config = {
                icon: 'error',
                type: 'error',
                message: 'Las contraseñas no coinciden',
                autoClose: true,
            }
            showNotification(config);
            return
        }

        setSubmitted(true)
        setNewPassword(password, props.UserStore)

    }

    return (
        <div>
            <div className={style.paper}>
                <img alt='logo' className={style.logo} src={logo} />
                <Typography className={style.title} variant='h3'>Mi Cuadrilla</Typography>
                <div className={style.backForm}>
                    <form className={style.form} onSubmit={changePassword} noValidate={false}>
                        <TextField type='password' label='Contraseña'
                        InputLabelProps={{className: style.field_label}}
                        InputProps={{className: style.field_input}}
                        onChange={ (ev)=> setPassword(ev.target.value)}
                        disabled={submitted}/>
                        <TextField className={style.field} type='password' label='Confirmar contraseña'
                        InputLabelProps={{className: style.field_label}}
                        InputProps={{className: style.field_input}}
                        onChange={ (ev)=> setConfirmedPassword(ev.target.value)}
                        disabled={submitted}/>
                        <Button disabled={submitted} variant='contained' className={style.buttons} type='submit'>Cambiar contraseña</Button>
                    </form> 
                </div>
            </div>
        </div>
    )
})
