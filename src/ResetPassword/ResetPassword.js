import React from 'react'
import { TextField, Button, Typography, withStyles } from '@material-ui/core'
import { style } from './ResetPasswordStyle'
import logo from '../logo.svg'
import { showNotification } from '../utils/notification'
import { resetPassword } from '../Actions'
import { connect } from 'react-redux'

class ResetPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailLocked: false,
            validationCode: '',
            password: '',
            confirmedPassword: '',
            submitted: false
        }

        if(this.props.userStore.email){
            this.state.email = this.props.userStore.email
            this.state.emailLocked = true
        }

    }

    resetPassword = (event) => {
        event.preventDefault()

        if (this.state.password !== this.state.confirmedPassword) {
            let config = {
                icon: 'error',
                type: 'error',
                message: 'Las contraseñas no coinciden',
                autoClose: true,
            }
            showNotification(config);
            return
        }

        this.setState({ submitted: true });
        this.props.resetPassword(this.state.email, this.state.password, this.state.validationCode)
    
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <div className={classes.paper}>
                    <img alt='logo' className={classes.logo} src={logo} />
                    <Typography className={classes.title} variant='h3'>Restaurar</Typography>
                    <Typography className={classes.title} variant='h3'>tu contraseña</Typography>
                    <div className={classes.backForm}>
                        <form className={classes.form} onSubmit={this.resetPassword} noValidate={false}>
                            <TextField type='email' label='Email'
                                InputLabelProps={{ className: classes.field_label }}
                                InputProps={{
                                    classes: {
                                        root: classes.field_input,
                                        disabled: classes.field_input_disabled
                                    }}
                                }
                                onChange={(ev) => this.setState({ email: ev.target.value })}
                                value={this.state.email}
                                disabled={this.state.submitted || this.state.emailLocked} />
                            <TextField label='Código de validación'
                                InputLabelProps={{ className: classes.field_label }}
                                InputProps={{ className: classes.field_input }}
                                onChange={(ev) => this.setState({ validationCode: ev.target.value })}
                                disabled={this.state.submitted} />
                            <TextField type='password' label='Contraseña'
                                InputLabelProps={{ className: classes.field_label }}
                                InputProps={{ className: classes.field_input }}
                                onChange={(ev) => this.setState({ password: ev.target.value })}
                                disabled={this.state.submitted} />
                            <TextField type='password' label='Confirmar contraseña'
                                InputLabelProps={{ className: classes.field_label }}
                                InputProps={{ className: classes.field_input }}
                                onChange={(ev) => this.setState({ confirmedPassword: ev.target.value })}
                                disabled={this.state.submitted} />
                            <Button disabled={this.state.submitted} variant='contained' className={classes.buttons} type='submit'>Enviar</Button>
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state) => (
    {
        userStore: state.user,
    }
)

export default connect(mapStateToProps, { resetPassword })(withStyles(style)(ResetPassword));
