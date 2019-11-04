import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { setToken, setUserData, setShops } from '../actionCreators'
import { fetchUserData } from '../adapter'


import UserContainer from './UserContainer'
import UserItemContainer from './UserItemContainer'
import PetContainer from './PetContainer'
import ShopContainer from './ShopContainer'
import Login from '../components/Login'
import Home from  '../components/Home'
import Goodbye from '../components/Goodbye'

import CreatePet from '../components/CreatePet'

import CareContainer from './CareContainer'
import Shop from '../components/Shop'
import uuid from 'uuid'


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
        fetch(`http://localhost:3000/shops`)
            .then(res => res.json())
            .then(shopArray => {
                this.props.setShops(shopArray)
            })
    }

    


    render() {
        return (
            <div id="main-container">
                { this.props.token ? <UserContainer /> : ""}
                {/* <h1>{ this.props.userData ? this.props.userData.username : "nothing"}</h1> */}
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login}/>
                    {/* <Route path="/inventory" exact component={UserItemContainer} />
                    <Route path="/pets" exact component={PetContainer} /> */}

                    <Route path="/create" exact component={CreatePet} />

                    <Route path="/shops" exact component={ShopContainer} />
                    <Route path="/goodbye" exact component={Goodbye} />

                    <Route path="/shops/:shopsId" exact render={this.shop} />
                    <Route path="/kennel" exact render={this.kennel} />
                </Switch>
            </div>
        )
    }

    shop = (renderProps) => {
        console.log("shopId", renderProps)
        let id = renderProps.match.params.shopsId
        if (localStorage.token) {
            let foundShop = this.props.shops.find( shop => {
                return shop.id == id
            })
            console.log("found", foundShop)
            return <Shop key={uuid.v4()} shop={foundShop} />
            //return <Goodbye />
        } else {
            renderProps.history.push("/login")
            return <Login />
        }

        
        //return <Shop key={uuid.v4()} shop={this.props.shops.} />
    }

    // testing something..
    kennel = () => {
        
        return (
        <React.Fragment>
            <CareContainer />
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
        userData: state.userData,
        shops: state.shops
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token, id) => {
            dispatch(setToken(token, id))
        },
        setUserData: (userData) => {
            dispatch(setUserData(userData))
        },
        setShops: (shops) => {
            dispatch(setShops(shops))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContainer))