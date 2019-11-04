import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCare } from '../actionCreators'
import { Jello } from 'react-motions'

class Pet extends Component {

    clickHandler = () => {
        // see if a pet is in the container
        let petExists = this.props.careThings.find( thing => { return thing.hygiene })
        if (petExists ) {
            console.log("you're already in here")
            return
        }
        console.log("hm")
        this.props.addToCare(this.props.pet)
    }

    renderImage = (img_url) => {
        if (this.props.animate) {
            return <Jello infinite><img className="pet-img" src={img_url} alt="an image of a cute monster" /></Jello>
        } else {
            return <img className="pet-img" src={img_url} alt="an image of a cute monster" />
        }
    }

    render() {
        let { name, img_url, hygiene, hunger, attention} = this.props.pet
        return (
            <div onClick={this.clickHandler} className="pet-div">
                <h1>{name}</h1>
                { this.renderImage(img_url)}
                {/* <img className="pet-img" src={img_url} alt="an image of a cute monster"/> */}
                <p> HYGIENE: {hygiene}/100 </p>
                <p> HUNGER: {hunger}/100 </p>
                <p> ATTENTION:  {attention}/100 </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Pet)
