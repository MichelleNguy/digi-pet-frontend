import React, { Component } from 'react'
import { setUserData } from '../actionCreators'
import { fetchUserData } from '../adapter'
import { connect} from 'react-redux'

class CreatePet extends Component {

    state = {
        name: "",
        img_url: "",
        errors: []
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    renderMonsters = () => {
        //extremely ugly way to implement, please don't judge
        let monsters = []
        for(let i=1;i<=30;i++) {
            monsters.push(`./monsters/${i}-monster.png`)
        }
        return (
            <React.Fragment>
                { monsters.map( monster => {
                    let nameOfClass = this.state.img_url === monster ? "selected-monster" : "monster-img"
                    return <img className={nameOfClass} onClick={ () => this.selectMonster(monster)}src={monster} alt="icon of an adorable monster."/>
                })}
            </React.Fragment>
        )
    }

    selectMonster = (monster) => {
        this.setState({
            img_url: monster
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        if (this.state.name === "") {
            this.setState({errors: ["NAME CANNOT BE BLANK FOR PET!"]})
        }
        fetch(`http://localhost:3000/pets`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token
            },
            body: JSON.stringify({
                name: this.state.name,
                img_url: this.state.img_url,
                user_id: localStorage.userId
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log("create", data)
                if (data.errors) {
                    this.setState({
                        ...this.state,
                        errors: data.errors
                    })
                    return
                } else {
                    this.stupidFunction()
                    this.props.history.push("/kennel")
                }
            })
    }

    stupidFunction = () => {
        fetchUserData()
            .then(data => {
                this.props.setUserData(data)
            })
    }

    render() {
        console.log(this.state)
        return (
            <div id="create-a-pet-div">
                <p>CREATE A PET!</p>
                { this.state.errors.empty ? "" : this.state.errors.map( error => <p>{error}</p>) }
                { this.renderMonsters() }
                <form onSubmit={this.handleSubmit}>
                    <input
                        id="monster-input"
                        input="text"
                        onChange={this.handleChange}
                        name="name"
                        placeholder="enter pet name here"
                        value={this.state.name}
                    >
                    </input>
                    <input id="monster-submit"type="submit" value="PRESS TO CREATE PET!"></input>
                </form>
                <br/>
                <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserData: (userData) => {
            dispatch(setUserData(userData))
        }
    }
}

export default connect(null, mapDispatchToProps)(CreatePet)
