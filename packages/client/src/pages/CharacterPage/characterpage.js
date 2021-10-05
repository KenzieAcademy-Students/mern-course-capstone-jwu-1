
import React, { useState, useEffect } from "react";
import "./characterpage.css"
import scorpion from "./images/scorpion.jpg"
import { useProvideUser, } from 'hooks/globalStates'
import axios from "axios"
import { Button } from "react-bootstrap";

const initialChar = {
    name: "SELECT A CHARACTER",
    description: "SELECT A CHARACTER",
    image: "SELECT A CHARACTER",
    id: null

}

export default function CharacterPage() {
    const [currentChar, setCurrentChar] = useState(initialChar)
    const [charList, setCharList] = useState([])
    const { state, dispatch } = useProvideUser()
    function testButton() {
        console.log(state)
    }
    async function selectCharacter() {
        if (state.currentGame !== null) {
            axios.get(`/api/chars/${state.currentGame.id}`)
                .then((res) => setCharList(res.data))
        }

    }
    function changeCharacter(e) {
        if (e.target.value === "none") {
            setCurrentChar({
                name: "SELECT A CHARACTER",
                description: "SELECT A CHARACTER",
                image: "SELECT A CHARACTER",
                id: null
            })
        } else {
            axios.get(`/api/chars/character/${e.target.value}`)
                .then((res) => {
                    setCurrentChar({
                        name: res.data.name,
                        description: res.data.description,
                        image: res.data.image,
                        id: res.data._id
                    })
                    console.log(res)
                })
        }
    }
    useEffect(selectCharacter, [state])
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
            
            <div class="character-select">
                <label for="character">Select Character: </label>
                <select name="characters" id="characters" class="characters" onChange={changeCharacter}>
                    <option value="none">None</option>
                    {/* <option value="Scorpion">Scorpion</option>
                    <option value="sub-zero">Sub-zero</option>
                    <option value="liuKang">Liu Kang</option>
                    <option value="sonya">Sonya Blade</option> */}
                    {state && charList.map(char => {
                        return (
                            <option key={char._id} value={char._id}>{char.name}</option>
                        )
                    })}
                </select>
                {/* <button class="submit" onClick={selectCharacter}>Submit</button> */}
            </div>
            <h2><a href="/create" class="create">Create New</a></h2>

            <div>

                {state.currentGame && <h1 class="game-title">{state.currentGame.name} Characters</h1>}
            </div>
            <div class="characterId">
                <h2 class="characterName">{currentChar.name}</h2>
                <p>Name: <span class="name">{currentChar.name}</span></p>
                {/* <p>Gender: <span class="gender"></span></p> */}
                {/* <p>Attributes: <span class="attributes"></span></p>
                    <p>Strength: </p>
                    <p>Agility: </p>
                    <p>Endurance: </p>
                    <p>Skills: </p> */}
                <div class="description">
                    <p>Description: {currentChar.description}</p>

                </div>
                {currentChar.id !== null && <img height="400px" src={currentChar.image} alt="Choose a character" />}

            </div>
        </main>

    )
}