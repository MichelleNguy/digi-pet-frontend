import React, { Component } from 'react'

export default class Item extends Component {
    render() {
        let { name, img_url, effect } = this.props.item
        return (
            <div className="item-div">
                <h1>{name}</h1>
                <img className="item-img" src={img_url} alt="an image of a cute monster" />
                
            </div>
        )
    }
}
