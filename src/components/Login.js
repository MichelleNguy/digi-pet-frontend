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
        // Not the prettiest code, but it will do for now
        // Will refactor
        e.preventDefault()
        
        let loginData = {
            username: this.state.username,
            password: this.state.password
        }
        
        let createData = {
            user: {
                ...loginData
            }
        }
        let fetchData
        this.state.login ? fetchData = [loginData, "login"] : fetchData = [createData, "users"]
        
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
                this.stupidFunction()
                this.props.history.push("/kennel")
            })
    }


    stupidFunction = () => {
        // fetch(`http://localhost:3000//users/${parseInt(localStorage.userId)}`, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: localStorage.token
        //     }
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         this.props.setToken(localStorage.token, localStorage.userId)
        //         this.props.setUserData(data)
        //     })
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