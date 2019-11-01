import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setToken, setUserData } from '../actionCreators'

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
        //extremely non-DRY and needs refactoring badly
        e.preventDefault()
        let fetchData = {
            user: {
                username: this.state.username,
                password: this.state.password
            }
        }

        let loginData = {
            username: this.state.username,
            password: this.state.password
        }

        if (this.state.login) {
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log("login data", data)
                    if (data.errors) {
                        this.setState({
                            ...this.state,
                            errors: data.errors
                        })
                        return 
                    }
                    localStorage.token = data.token
                    localStorage.userId = data.user_id
                    this.props.setToken(data.token, data.user_id)
                    this.props.history.push("/pets")
                    this.stupidFunction()
                })
        } else {
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(fetchData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log("create data", data)
                    if (data.errors) {
                        this.setState({
                            ...this.state,
                            errors: data.errors
                        })
                        return
                    }
                    localStorage.token = data.token
                    localStorage.userId = data.user_id
                    this.props.setToken(data.token, data.user_id)
                    this.props.history.push("/pets")
                    this.stupidFunction()
                })
        }
    }

    //
    stupidFunction = () => {
        fetch(`http://localhost:3000//users/${parseInt(localStorage.userId)}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("token", localStorage.token)
                console.log("id", localStorage.userId)
                this.props.setToken(localStorage.token, localStorage.userId)
                this.props.setUserData(data)
            })
    }
    //

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
            <div>
                <h1>{this.state.errors.empty ? "" : this.printErrors()}</h1>
                <button onClick={this.changeOption}>{ this.buttonDisplay() }</button>
                <form onSubmit={this.handleSubmit}>
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
                    <input type="submit"></input>
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