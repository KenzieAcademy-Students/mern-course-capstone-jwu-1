import React from "react"
import "./create.css"

export default class Create extends React.Component {
    state = {
        name: "",
        gender: "",
        attributes: "",
        strength: "",
        agility: "",
        endurance: "",
        skills: "",
        description: ""
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()
        // this.props.onSubmit(this.state)
        console.log(this.state)
        this.setState({
            name: "",
            gender: "",
            attributes: "",
            strength: "",
            agility: "",
            endurance: "",
            skills: "",
            description: ""
        })
    }

    render() {
    return (
        <main>
            <h2 class="new">Create Your Own Character</h2>
            {/* <div class="characterImg">
                <h3>Character Name:</h3>

            </div> */}
            <div class="characterInput">
                <form class="form">
                    <label for="name">Name: </label>
                    <input 
                    type="text" name="name" required placeholder="Character Name" 
                    value={this.state.name} 
                    onChange={e => this.change(e)} 
                    /><br></br>
                    <label for="gender">Gender: </label>
                    <input 
                    type="text" name="gender" required placeholder="Character Gender" 
                    value={this.state.gender} 
                    onChange={e => this.change(e)} 
                    /><br></br>
                    <label for="attributes">Attributes: </label>
                    <input 
                    type="number" name="attributes" min="0" required placeholder="Character Attribute" 
                    value={this.state.attributes} 
                    onChange={e => this.change(e)}
                    /><br></br>
                    <label for="strength">Strength: </label>
                     <input 
                    type="number" name="strength" min="0" required placeholder="Character Strength" 
                    value={this.state.strength} 
                    onChange={e => this.change(e)}
                    /><br></br>
                    <label for="Agility">Agility: </label>
                    <input 
                    type="number" name="agility" min="0" required placeholder="Character Agility" 
                    value={this.state.agility} 
                    onChange={e => this.change(e)}
                    /><br></br>
                    <label for="endurance">Endurance: </label>
                    <input 
                    type="number" name="endurance" min="0" required placeholder="Character Endurance" 
                    value={this.state.endurance} 
                    onChange={e => this.change(e)}
                    /><br></br>
                    <label for="Skills">Skills: </label>
                    <input 
                    type="text" name="skills" required placeholder="Character Special Move" 
                    value={this.state.skills} 
                    onChange={e => this.change(e)}
                    /><br></br>
                    <label for="description" class="desLabel">Description: </label>
                    <textarea 
                    class="textarea" name="description" placeholder="Describe the character"
                    value={this.state.description}
                    onChange={e => this.change(e)}
                    ></textarea><br></br>
                    <button class="createButton" onClick={(e) => this.onSubmit(e)}>Create</button>
                </form>
            </div>
            <div>
            <button class="characterButton" onClick={() => window.location.replace("/character")}>Character Page</button>
            </div>
        </main>
    )
    }
}