import React from "react";
import chatapplogo from '../assests/chatapplogo.jpg';

const AuthLayouts = ({children})=>{
    return (
        <>
        <header className="flex justify-center items-center py-3 h-20 shadow-md bg-white">
            <img src={chatapplogo} alt="logo" width={100} height={60}></img>
        </header>
        {children}
        </>
        
    )
}

export default AuthLayouts