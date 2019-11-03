import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCare } from '../actionCreators'

class Item extends Component {

    renderEffectDisplay = (effect) => {
        let returnedStr = ""
        let parsedEffect = JSON.parse(effect)
        for (let [key, value] of Object.entries(parsedEffect)) {
            //pet[`${key}`] += value
            returnedStr += `${key}: ${value}\r\n`
        }
        return returnedStr
    }


    clickHandler = () => {
        // see if a pet is in the container
        let itemExists = this.props.careThings.find(thing => { return thing.price })
        if (itemExists) {
            console.log("you're already in here")
            return
        }
        this.props.addToCare(this.props.item)
    }

    render() {
        let { name, img_url, effect, price } = this.props.item
        return (
            <div onClick={this.clickHandler} className="item-div">
                <h1>{name}</h1>
                <img className="item-img" src={img_url} alt="an image of a cute monster" />
                <p>{ this.renderEffectDisplay(effect)}</p>
                <p>{this.props.showPrice ? `$${price}` : ""}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        careThings: state.care,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCare: (thing) => {
            dispatch(addToCare(thing))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)