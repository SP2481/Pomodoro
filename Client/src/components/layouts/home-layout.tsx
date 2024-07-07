'use client'
import { useLogin } from '@/hooks/useLogin';
import React from "react";
import Header from "../header/header";

export default function HomeLayout ({ children }  : { children : React.ReactNode}) {
    useLogin()
    return (
        <div className="bg-black overflow-hidden h-screen">
            <Header/>
            {children}
        </div>
    )
}