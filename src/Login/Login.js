import React from 'react'
import { TextField, Button, Typography, Link, withStyles } from '@material-ui/core'
import { style } from './LoginStyle'
import logo from '../logo.svg'
import { connect } from 'react-redux'
import { signIn } from '../Actions'


class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            submitted: false,
        }

        if (this.props.userStore.cognitoUser) {
            this.props.history.push('/home')
        }
    }

    login = (event) => {
        event.preventDefault()
        this.setState({ submitted: true })

        this.props.signIn(this.state.username, this.state.password)
            .catch((err) => {
                console.log(err)
                this.setState({ submitted: false })
            })
    }

    render() {
        const { classes, history } = this.props
        return (
            <div>
                <div className={classes.paper}>
                    <img alt='logo' className={classes.logo} src={logo} />
                    <Typography className={classes.title} variant='h3'>Mi Cuadrilla</Typography>
                    <div className={classes.backForm}>
                        <form className={classes.form} onSubmit={this.login} noValidate={false}>
                            <TextField label='Usuario'
                                InputLabelProps={{ className: classes.field_label }}
                                InputProps={{ className: classes.field_input }}
                                onChange={(ev) => this.setState({ username: ev.target.value })}
                                disabled={this.state.submitted} />
                            <TextField className={classes.field} type='password' label='Contraseña'
                                InputLabelProps={{ className: classes.field_label }}
                                InputProps={{ className: classes.field_input }}
                                onChange={(ev) => this.setState({ password: ev.target.value })}
                                disabled={this.state.submitted} />
                            <Button disabled={this.state.submitted} variant='contained' className={classes.buttons} type='submit'>Iniciar sesión</Button>
                        </form>
                    </div>
                    <Link onClick={() => history.push('/forgetpassword')} className={classes.forgotPassword}>¿Has olvidado la contraseña?</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        userStore: state.user,
    }
)


export default connect(mapStateToProps, { signIn })(withStyles(style)(Login));
