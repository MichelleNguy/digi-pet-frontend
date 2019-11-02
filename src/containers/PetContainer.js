import React, { Component } from 'react'
import uuid from 'uuid'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Jello } from 'react-motions';

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
                {console.log("cheese", this.props.userData)}
                <Link className="create-pet-link" to="/create" exact>CREATE-A-PET</Link>
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