import React, { useReducer, useContext, createContext, useEffect } from 'react'
const initialState = {
    id: null,
    username: null,
    image: null
}
const userReducer = (state, action) =>{
    switch(action.type){
        case 'CHANGE_USER':
            console.log(action.info.username)
            return {
                ...state,
                id: action.info._id,
                username: action.info.username,
                image: action.info.image
            }
    }

}
const userContext = createContext()
export const useUser = () => {
    return useContext(userContext)
  }
export default function ProvideUser({children}) {
    const [state, dispatch] = useReducer(userReducer, initialState)
    return (
        <userContext.Provider value={{
                state,
                dispatch,
            }}>
                {children}
        </userContext.Provider>
    )
}

export const useProvideUser = () =>{
    const {state, dispatch} = useUser();
    return{
        state,
        userReducer
    }
}