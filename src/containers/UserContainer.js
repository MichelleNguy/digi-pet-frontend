import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserContainer extends Component {

    displayInfo = () => {
        if (!this.props.userData) {
            return ""
        } else {
            return `${this.props.userData.username}  $${this.props.userData.bank}`
        }
    }

    render() {
        return (
            <div id="user-container">
                { this.props.userData ? this.displayInfo() : ""}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData
    }
}

export default connect(mapStateToProps)(UserContainer)

