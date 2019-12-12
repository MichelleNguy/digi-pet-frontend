import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setToken, setUserData } from '../actionCreators'
import { fetchUserData } from '../adapter'

const defaultState = {
    username: "",
    password: "",
    login: true,
    errors: []
}

class Login extends Component {

    state = {
        ...defaultState
    }

    handleSubmit = (e) => {
        //prevent page from reloading
        e.preventDefault()
        
        // if this.state.login is true, this is the body sent in the fetch
        let loginData = {
            username: this.state.username,
            password: this.state.password
        }
        // if we are creating a new user, this is the body sent in the fetch instead
        let createData = {
            user: {
                ...loginData
            }
        }
        // to determine whether or not api call is to login or to create
        let fetchData = this.state.login ? [loginData, "login"] : [createData, "users"]
        
        fetch(`http://localhost:3000/${fetchData[1]}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(fetchData[0])
        })
            .then(res => res.json())
            .then(data => {
                // if errors are returned, change state to reflect errors
                if (data.errors) {
                    this.setState({
                        ...this.state,
                        errors: data.errors
                    })
                    return
                }
                localStorage.token = data.token
                localStorage.userId = data.user_id
                //this.props.setToken(data.token, data.user_id)
                this.stupidFunction()
                this.state.login ? this.props.history.push("/kennel") : this.props.history.push("/create")
            })
    }


    stupidFunction = () => {
        fetchUserData()
            .then(data => {
                this.props.setToken(localStorage.token, localStorage.userId)
                this.props.setUserData(data)
            })
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeOption = () => {
        this.setState({
            login: this.state.login ? false : true
        })
    }

    buttonDisplay = () => {
        return this.state.login ? "Logging In" : "Signing Up"
    }

    printErrors = () => {
        let errorStr = ""
        this.state.errors.forEach( error => {
            errorStr += error + '\r\n'
        })
        return errorStr
    }

    render() {
        return (
            <div id="login-div">
                <h1>{this.state.errors.empty ? "" : this.printErrors()}</h1>
                <button id="login-signup-btn"onClick={this.changeOption}>{ this.buttonDisplay() }</button>
                <form id="login-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="username"
                        placeholder="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    >
                    </input>
                    <input
                        type="text"
                        name="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    >
                    </input>
                    <input id="login-submit"type="submit"></input>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token, userId) => {
            dispatch(setToken(token, userId))
        },
        setUserData: (userData) => {
            dispatch(setUserData(userData))
        } 
    }
}

export default connect(null, mapDispatchToProps)(Login)