import React from 'react'
import { Button } from '@material-ui/core'
import { signOut } from '../Actions'
import { connect } from 'react-redux'

class Home extends React.Component {

    logoutHandler = async () => {
        this.props.signOut()
    }

    render() {
        return (
            <div>
                <Button variant='contained' onClick={this.logoutHandler}>Cerrar sesión</Button>
            </div>
        )
    }
}

export default connect(null, { signOut })(Home);