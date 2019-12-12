import React, { Component } from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'

import Pet from '../components/Pet'

class PetContainer extends Component {

    displayInfo = () => {
        return (
            <React.Fragment>
                {this.props.userData.pets.map( pet => {
                    return <Pet key={uuid.v4()} pet={pet}/>
                })}
            </React.Fragment>
        )
    }




    render() {
        return (
            <div id="pet-container">
                {this.props.userData ? this.displayInfo() : ""}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData
    }
}

export default connect(mapStateToProps)(PetContainer)