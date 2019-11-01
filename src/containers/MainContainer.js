import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { setToken, setUserData } from '../actionCreators'


import UserContainer from './UserContainer'
import UserItemContainer from './UserItemContainer'
import PetContainer from './PetContainer'
import ShopContainer from './ShopContainer'
import Login from '../components/Login'
import Home from  '../components/Home'


class MainContainer extends Component {

    componentDidMount() {
        // Check here is there is a token in local storage for persisting
        if (localStorage.token) {
            let id = parseInt(localStorage.userId)
            fetch(`http://localhost:3000//users/${id}`, {
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
    }

    


    render() {
        console.log("userdata", this.props.userData)
        return (
            <div id="main-container">
                { this.props.token ? <UserContainer /> : ""}
                <h1>{ this.props.userData ? this.props.userData.username : "nothing"}</h1>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login}/>
                    <Route path="/items" exact component={UserItemContainer} />
                    <Route path="/pets" exact component={PetContainer} />
                    <Route path="/shops" exact component={ShopContainer} />
                </Switch>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
        userData: state.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token, id) => {
            dispatch(setToken(token, id))
        },
        setUserData: (userData) => {
            dispatch(setUserData(userData))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContainer))