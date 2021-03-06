import React, {  createContext, useState, useContext, useEffect } from "react";

const AuthContex = createContext(); 

const AuthContexDispatcher = createContext();

const LOCAL_STORAGE_AUTH_KEY = "auth token";

function AuthProvider({children}){
    const[state,setState ] = useState(false);

    useEffect(()=>{
        let userData;
        if (userData !== "undefined"){
         userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_KEY))|| false; 
            setState(userData)
        }
    },[]);

    useEffect(()=>{
        const data = JSON.stringify(state);
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY,data)
    },[state]);

    return(
        <AuthContex.Provider value={state}>
            <AuthContexDispatcher.Provider value={setState}>
                {children}
            </AuthContexDispatcher.Provider>
        </AuthContex.Provider>
    )
}

export default AuthProvider;

export const useAuth = ()=> useContext(AuthContex);
export const useAuthAction = ()=> useContext(AuthContexDispatcher);