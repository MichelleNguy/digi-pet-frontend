import React, { Component } from 'react'
import uuid from 'uuid'

import Item from './Item'

export default class Shop extends Component {

    renderItems = () => {
        return (
            <React.Fragment>
                <h1>{this.props.shop.name}</h1>
                {this.props.shop.items.map(item => {
                    return <Item key={uuid.v4()} item={item} showPrice={true} />
                })}
            </React.Fragment>
        )
    }

    render() {
        // let {name} = this.props.shop
        console.log("inside shop", this.props.shop)
        return (
            <div className="single-shop">
                { this.props.shop ? this.renderItems() : ""}
            </div>
        )
    }
}
