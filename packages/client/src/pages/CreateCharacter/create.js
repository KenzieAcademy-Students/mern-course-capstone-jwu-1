import React, { useState, useEffect } from "react"
import "./create.css"
import { useProvideUser } from "hooks/globalStates"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useProvideStyle } from 'hooks/useStyle';

const initialState = {
    name: null,
    description: null,
    image: ""
}
export default function CreatePage() {
    const [clickedSubmit, setClickedSubmit] = useState(false)
    const { state, dispatch } = useProvideUser()
    const [input, setInput] = useState()
    const [image, setImage] = useState()
    const [attrAList, setAttrAList] = useState()
    const [attrBList, setAttrBList] = useState()
    const [attrAList2, setAttrAList2] = useState()
    const [attrBList2, setAttrBList2] = useState()
    const colorScheme = useProvideStyle();
    const [validated, setValidated] = useState(true);
    async function validateToken() {
		if (state) {
			await axios
				.post('/api/auth', {
					token: state.token
				})
				.then((res) => {
					setValidated(res.data._id === state.id)
				})
                .catch((err)=>{
                    setValidated(false)
                })
		}
	}
	useEffect(validateToken,[state])

    document.body.setAttribute("id", colorScheme.getStyle())

    function changeInput(e) {
        let target = e.target.name;
        setInput({
            ...input,
            [target]: e.target.value
        })
        // console.log(input)
    }
    async function findAttrA() {
        if (state.currentGame) {
            await axios
                .get(`/api/attr/attra/${state.currentGame.id}`)
                .then((res) => {
                    let attributeList = res.data.filter(attribute => attribute.owned === false).map(filteredAtt => filteredAtt.name)
                    let newAttrList = {

                    }
                    attributeList.forEach(name => {
                        newAttrList = (
                            {
                                ...newAttrList,
                                [name]: ""

                            }
                        )
                    })
                    setAttrAList2(newAttrList)
                    setAttrAList(res.data.filter(attribute => attribute.owned === false))
                })
        }
    }
    useEffect(findAttrA, [state])
    async function findAttrB() {
        if (state.currentGame) {
            await axios
                .get(`/api/attr/attrB/${state.currentGame.id}`)
                .then((res) => {
                    let attributeList = res.data.filter(attribute => attribute.owned === false).map(filteredAtt => filteredAtt.name)
                    let newAttrList = {

                    }
                    attributeList.forEach(name => {
                        newAttrList = (
                            {
                                ...newAttrList,
                                [name]: 0

                            }
                        )
                    })
                    setAttrBList2(newAttrList)
                    setAttrBList(res.data.filter(attribute => attribute.owned === false))
                })
        }
    }
    useEffect(findAttrB, [state])
    const changeCharacterImage = async (event) => {
        let url = event.target.value
		if(url){
			setImage(url)
		}else{
			setImage()
		}
    }

    function setColor(color) {
        colorScheme.setNewStyle(color.target.value)
        document.body.id = colorScheme.getStyle()
    }

    return (
        <main>
            {validated ? <div className = "main">
                {/* <button onClick={test}>Test</button> */}
                <div id="character-creation-screen">
                    <h2 class="new">Create Your Own Character</h2>

                    <div class="characterInput">
                        <form class="form" onChange={changeInput}>
                            <div className="attribute-input">
                                <label for="name">Name: </label>
                                <input type="text" name="name" class="charName" required></input>
                            </div>
                            {attrAList !== undefined && attrAList.map(attribute => {

                                return (
                                    <div className="attribute-input">
                                        <label for={attribute.name}>{attribute.name}: </label>
                                        <input onChange={(e) => {
                                            setAttrAList2({
                                                ...attrAList2,
                                                [attribute.name]: e.target.value
                                            })

                                        }} type="text" name={attribute.name}></input>
                                    </div>
                                )

                            })}
                            {attrBList !== undefined && attrBList.map(attribute => {

                                return (
                                    <div className="attribute-input">
                                        <label for={attribute.name}>{attribute.name}: </label>
                                        <input type="number" name={attribute.name} onChange={(e) => {
                                            setAttrBList2({
                                                ...attrBList2,
                                                [attribute.name]: e.target.value
                                            })

                                        }}></input>
                                    </div>
                                )

                            })}
                            <div className="attribute-input">
                                <label for="description">Description: </label>
                                <textarea type="textarea" name="description"></textarea><br></br>
                            </div>
                            <label for="upload">Upload a character image URL here!</label>
                            <input type="input" onChange={changeCharacterImage} /><br />
                            {!clickedSubmit && <input type="submit" id="submit" value="Submit" onClick={
                                async (e) => {
                                    toast.success("Your new character is being created!")
                                    setClickedSubmit(true)
                                    let newCharId
                                    e.preventDefault()
                                    await axios.post
                                        ("/api/chars/", {
                                            name: input?.name,
                                            description: input?.description,
                                            game: state.currentGame.id,
                                            image
                                        }).then((res) => {
                                            newCharId = res.data._id
                                        })
                                    for (let key in attrAList2) {
                                        await axios
                                            .post('/api/attr', {
                                                name: key,
                                                type: "Words",
                                                game: state.currentGame.id,
                                                owned: true,
                                                value: attrAList2[key]
                                            })
                                            .then(async res => {
                                                let attrId = res.data._id
                                                await axios
                                                    .put('/api/attr/to-characters', {
                                                        game: state.currentGame.id,
                                                        character: newCharId,
                                                        attribute: attrId
                                                    })
                                                    .then(res => {
                                                      
                                                    })
                                            })
                                    }
                                    for (let key in attrBList2) {
                                        await axios
                                            .post('/api/attr', {
                                                name: key,
                                                type: "Numbers",
                                                game: state.currentGame.id,
                                                owned: true,
                                                value: attrBList2[key]
                                            })
                                            .then(async res => {
                                                let attrId = res.data._id
                                                await axios
                                                    .put('/api/attr/to-characters', {
                                                        game: state.currentGame.id,
                                                        character: newCharId,
                                                        attribute: attrId
                                                    })
                                                    .then(res => {
                                                       
                                                    })
                                            })
                                    }
                                    window.location.replace("/character")
                                }
                            } />}
                        </form>
                    </div>
                    <div>
                        {!clickedSubmit && <button class="characterPage" onClick={() => window.location.replace("/character")}>Character Page</button>}
                    </div>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                <label for="color" id="bottom">Please select a color:</label>
                <select id="color" onChange={setColor}>
                    <option value="green">Green and Purple</option>
                    <option value="red">Red and Blue</option>
                    <option value="blue">Blue and Yellow</option>
                </select>
            </div> :
                <div className = "main">
                    {/* <h3>You are not authorized to use this page yet </h3>
                    <button onClick={() => {
                        window.location.replace("/")
                    }}>Go Back To Login</button> */}
                </div>}

        </main>
    )
}