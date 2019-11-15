import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCare, setUserData } from '../actionCreators'
import { fetchUserData } from '../adapter'

class Item extends Component {

    renderEffectDisplay = (effect) => {
        let returnedStr = ""
        let parsedEffect = JSON.parse(effect)
        for (let [key, value] of Object.entries(parsedEffect)) {
            returnedStr += `${key}: ${value}\r\n`
        }
        return returnedStr
    }


    clickHandler = () => {
        if (this.props.showPrice) { return }
        let itemExists = this.props.careThings.find(thing => { return thing.price })
        if (itemExists) {
            console.log("you're already in here")
            return
        }
        this.props.addToCare(this.props.item)
    }

    shopItemRender = () => {
        return (
            <React.Fragment>
                <p>{`$${this.props.item.price}`}</p>
                <button className="item-buy-button" onClick={this.buyItem}>BUY</button>
            </React.Fragment>
        )
    }

    buyItem = () => {
        console.log("item-id", this.props.item.id)
        console.log('user-id', this.props.userData.id)
        fetch(`http://localhost:3000/user_items`, {
        method: 'POST',
            headers: {
            'Content-Type': 'application/json',
                'Accept': 'application/json'
        },
        body: JSON.stringify({
                user_id: this.props.userData.id,
                item_id: this.props.item.id,
            })
        })
            .then(res => res.json())
            .then(obj => {
                this.updateUser()
                obj.poor ? alert("you cannot afford that") : alert("You just bought an item")
            })
    }

    updateUser = () => {
        fetchUserData()
            .then(data => {
                this.props.setUserData(data)
            })
    }

    render() {
        let { name, img_url, effect, price } = this.props.item
        return (
            <div onClick={this.clickHandler} className="item-div">
                <h1>{name}</h1>
                <img className="item-img" src={img_url} alt="an image of a cute monster" />
                <p>{ this.renderEffectDisplay(effect)}</p>
                <p>{this.props.showPrice ? this.shopItemRender() : ""}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        careThings: state.care,
        userData: state.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCare: (thing) => {
            dispatch(addToCare(thing))
        }, 
        setUserData: (userData) => {
            dispatch(setUserData(userData))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)