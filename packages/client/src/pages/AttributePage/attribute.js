import React from "react"
import { Button } from "react-bootstrap"
import "./attribute.css"
import { useProvideUser, } from 'hooks/globalStates'
import axios from "axios"
import { useProvideStyle } from 'hooks/useStyle';



export default function AttributePage() {
    const { state, dispatch } = useProvideUser()

    const colorScheme = useProvideStyle();

    document.body.setAttribute("id", colorScheme.getStyle())

    function setColor(color){
        console.log(color.target.value)
        colorScheme.setNewStyle(color.target.value)
        document.body.id = colorScheme.getStyle()
    }
    //function goes here
    return (
        <main>
            {/* <button onClick={testButton}>Test Button</button> */}
            <div className="log">
                    <Button class="logout" onClick={() => window.location.replace("/")}>Logout</Button>
                    <Button class="back" onClick={() => window.location.replace("/games")}>Back to List</Button>
                <div id = "current-game">
                    {state.currentGame && <div id="game-title">{state.currentGame.name}</div>}
                    {state.currentGame && <img height="50px" src={state.currentGame.image} />}
                </div>
            </div>
            <div className="header">
                <h3><a className="header-item" href="/character">Character</a></h3>
                <h3><a className="header-item" href="/item">Items</a></h3>
                <h3><a className="header-item" href="/places">Places</a></h3>
                <h3><a className="header-item" href="/skills">Skills</a></h3>
                <h3><a className="header-item" href="/attributes">Attributes</a></h3>
            </div>
            
            <h1 class="attribute">Attribute</h1>
            <select name="color" onChange={setColor}>
                <option value="green">Green and Purple</option>
                <option value="red">Red and Blue</option>
                <option value="blue">Blue and Yellow</option>
            </select>
        </main>
    )
}