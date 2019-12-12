import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearCare, setUserData } from '../actionCreators'
import { fetchUserData } from '../adapter'
import { Jello } from 'react-motions';

import Pet from '../components/Pet'
import Item from '../components/Item'
import uuid from 'uuid'

class CareContainer extends Component {

    renderCareThings = () => {
        console.log("things are in the care container..this thing..", this.props.careThings)
        return (
            <React.Fragment>
                {this.props.careThings.map(thing => {
                    console.log(thing)
                    return thing.effect ? <Item key={uuid.v4()} item={thing} /> : <Pet key={uuid.v4()} pet={thing} animate={true} />
                })}
                <button className="care-btn" onClick={this.handleCare}>PRESS HERE TO CARE FOR PET!</button>
            </React.Fragment>
        )
    }

    //set user data
    stupidFunction = () => {
        fetchUserData()
            .then(data => {
                this.props.setUserData(data)
            })
    }

    useEffect = (effect, pet) => {
        let parsedEffect = JSON.parse(effect)
        for (let [key, value] of Object.entries(parsedEffect)) {
            pet[`${key}`] += value
        }
        fetch(`http://localhost:3000/pets/${pet.id}`, {
                method: "PATCH",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(pet)
            })
                .then( res => res.json())
                .then( (something) => {
                    console.log(something)
                    this.stupidFunction()
                    this.handleClear()
                })
    }

    handleCare = () => {
        if (this.props.careThings.length < 2) {return}
        let item = this.props.careThings.find( thing => thing.price)
        let pet = this.props.careThings.find(thing => thing.hygiene)
        this.useEffect(item.effect, pet)

        if (item.consumable) { 
            let itemToDelete = this.props.userData.user_items.find(userItem => { 
                return userItem.item_id == item.id
            })
            fetch(`http://localhost:3000/user_items/${itemToDelete.id}`, {
                method: "DELETE"
            })
        }
        item.consumable ? alert(`You fed ${pet.name} a(n) ${item.name}. It has been removed from your inventory.`) : alert(`You used ${item.name} on ${pet.name}. It has been returned to your inventory.`)

    }

    handleClear = () => {
        this.props.clearCare()
    }
    
    render() {
        console.log("is empty?",this.props.careThings)
        return (
            <div id="care-container">
                <button className="clear-btn" onClick={this.handleClear}>CLEAR PETS AND ITEMS FROM HERE</button>
                {this.props.careThings.length ? this.renderCareThings() : "Click on a pet and an item to add to this area. When a pet and item have been selected, you will be able to take care of the chosen pet with the chosen item." }
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
        clearCare: () => {
            dispatch(clearCare())
        },
        setUserData: (userData) => {
            dispatch(setUserData(userData))
        } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CareContainer)
