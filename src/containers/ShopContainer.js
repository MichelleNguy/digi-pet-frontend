import React, { Component } from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { setShops } from '../actionCreators'

import { NavLink } from 'react-router-dom'

class ShopContainer extends Component {

    // componentDidMount(){
    //     fetch(`http://localhost:3000/shops`)
    //         .then(res => res.json())
    //         .then(shopArray => {
    //             console.log(shopArray)
    //             this.props.setShops(shopArray)
    //         })
    // }    

    renderShops = () => {
        return (
            <React.Fragment>
                { this.props.shops.map( shop => {
                    // return <Shop key={uuid.v4()} shop={shop}/> 
                    //return <p>{shop.name}</p>
                    return <NavLink to={`/shops/${shop.id}`} exact><p>{shop.name}</p></NavLink>
                    
                })}
            </React.Fragment>
        )
    }

    render() {
        console.log("shops:", this.props.shops)
        return (
            <div>
                Click on a shop to go shopppppping!
                { this.props.shops ? this.renderShops() : ""}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        shops: state.shops
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShops: (shops) => {
            dispatch(setShops(shops))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopContainer)