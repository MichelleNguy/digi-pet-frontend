import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actionCreators'

class NavContainer extends Component {
    
    render() {
        return (
            <div id="nav-container">
                <NavLink className="nav-link" to="/" exact>DiGi - PETS</NavLink>
                { this.props.token ? this.loggedInLinks() : this.loggedOutLinks()}
            </div>
        )
    }

    loggedOutLinks = () => {
        return <NavLink className="login-nav-link" to="/login" exact>LOGIN</NavLink>
    }

    loggedInLinks = () => {
        return (
            <React.Fragment>
                {/* <NavLink className="nav-link" to="/inventory" exact>INVENTORY</NavLink>
                <NavLink className="nav-link" to="/pets" exact>PETS</NavLink> */}
                <NavLink className="nav-link" to="/kennel" exact>KENNEL</NavLink>
                <NavLink className="nav-link" to="/shops" exact>SHOPS</NavLink>
                <NavLink onClick={this.logout} className="login-nav-link" to="/goodbye" exact>LOGOUT</NavLink>
            </React.Fragment>
        )
    }

    logout = () => {
        localStorage.clear()
        this.props.logout()
    }

}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        userId: state.loggedInUserId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: dispatch(logout)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer)
