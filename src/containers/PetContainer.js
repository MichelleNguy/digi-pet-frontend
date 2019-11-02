import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Jello } from 'react-motions';

class PetContainer extends Component {

    displayInfo = () => {
        return (
            <React.Fragment>
                {this.props.userData.pets.map( pet => {
                    return (
                    <div className="pet-div" key={pet.id}>
                        <h2>{pet.name}</h2>
                        <Jello infinite><img className="pet-img" src={pet.img_url}></img></Jello>
                    </div>)
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