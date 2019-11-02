import React, { Component } from 'react'

export default class Pet extends Component {



    render() {
        let { name, img_url, hygiene, hunger, attention} = this.props.pet
        return (
            <div className="pet-div">
                <h1>{name}</h1>
                <img className="pet-img" src={img_url} alt="an image of a cute monster"/>
                <p> HYGIENE: {hygiene}/100 </p>
                <p> HUNGER: {hunger}/100 </p>
                <p> ATTENTION:  {attention}/100 </p>
            </div>
        )
    }
}
