import React, { Component } from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'

import Item from '../components/Item'

class UserItemContainer extends Component {

    displayInfo = () => {
        return (
            <React.Fragment>
                {this.props.userData.items.map(item => {
                    return <Item key={uuid.v4()} item={item} />
                })}
            </React.Fragment>
        )
    }




    render() {
        return (
            <div id="user-item-container">
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

export default connect(mapStateToProps)(UserItemContainer)


