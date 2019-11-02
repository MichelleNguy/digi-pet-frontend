import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { setToken, setUserData } from '../actionCreators'
import { fetchUserData } from '../adapter'


import UserContainer from './UserContainer'
import UserItemContainer from './UserItemContainer'
import PetContainer from './PetContainer'
import ShopContainer from './ShopContainer'
import Login from '../components/Login'
import Home from  '../components/Home'
import Goodbye from '../components/Goodbye'

import CreatePet from '../components/CreatePet'


class MainContainer extends Component {

    componentDidMount() {
        // Check here is there is a token in local storage for persisting
        if (localStorage.token) {
            fetchUserData()
                .then(data => {
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
                {/* <h1>{ this.props.userData ? this.props.userData.username : "nothing"}</h1> */}
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login}/>
                    <Route path="/inventory" exact component={UserItemContainer} />
                    <Route path="/pets" exact component={PetContainer} />

                    <Route path="/create" exact component={CreatePet} />

                    <Route path="/shops" exact component={ShopContainer} />
                    <Route path="/goodbye" exact component={Goodbye} />


                    <Route path="/test" exact render={this.test} />
                </Switch>
            </div>
        )
    }

    // testing something..
    test = () => {
        return (
        <React.Fragment>
            <PetContainer />
            <UserItemContainer />
        </React.Fragment>
        )
    }

    //

}

const mapStateToProps = (state) => {
    return {
        token: state.token,
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