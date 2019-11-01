import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actionCreators'

class NavContainer extends Component {
    
    render() {
        console.log("tokes", this.props.token)
        return (
            <div id="nav-container">
                <NavLink className="nav-link" to="/" exact>HOME</NavLink>
                { this.props.token ? this.loggedInLinks() : this.loggedOutLinks()}
            </div>
        )
    }

    componentDidMount() {
        console.log("token", this.props.token)
    }

    loggedOutLinks = () => {
        return <NavLink className="login-nav-link" to="/login" exact>LOGIN</NavLink>
    }

    loggedInLinks = () => {
        return (
            <React.Fragment>
                <NavLink className="nav-link" to="/inventory" exact>INVENTORY</NavLink>
                <NavLink className="nav-link" to="/pets" exact>PETS</NavLink>
                <NavLink className="nav-link" to="/shops" exact>SHOPS</NavLink>
                <NavLink onClick={this.logout} className="login-nav-link" to="/" exact>LOGOUT</NavLink>
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
