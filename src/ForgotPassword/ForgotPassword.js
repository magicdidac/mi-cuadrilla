import React from 'react'
import { TextField, Button, Typography, withStyles } from '@material-ui/core'
import { style } from './ForgotPasswordStyle'
import logo from '../logo.svg'
import { showNotification } from '../utils/notification'
import { setNewPassword } from '../Actions'
import { connect } from 'react-redux'

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            submitted: false
        }
    }

    sendEmail = (event) => {
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
        this.props.setNewPassword(this.state.password, this.props.userStore.cognitoUser)

    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <div className={classes.paper}>
                    <img alt='logo' className={classes.logo} src={logo} />
                    <Typography className={classes.title} variant='h3'>Tu email</Typography>
                    <div className={classes.backForm}>
                        <form className={classes.form} onSubmit={this.sendEmail} noValidate={false}>
                            <TextField type='email' label='email'
                                InputLabelProps={{ className: classes.field_label }}
                                InputProps={{ className: classes.field_input }}
                                onChange={(ev) => this.setState({ email: ev.target.value })}
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

export default connect(mapStateToProps, { setNewPassword })(withStyles(style)(ForgotPassword));
