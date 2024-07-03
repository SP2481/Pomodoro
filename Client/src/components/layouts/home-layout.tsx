import React from "react";
import Header from "../header/header";

export default function HomeLayout ({ children }  : { children : React.ReactNode}) {
    return (
        <div className="bg-black">
            <Header/>
            {children}
        </div>
    )
}