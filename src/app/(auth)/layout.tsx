"use client";
import { useAuthStore } from "@/store/Auth"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react";

const Layout = ({children} : {children: React.ReactNode}) => {
    const {session, hydrated, verifySession} = useAuthStore();
    const router = useRouter()
    
 
    React.useEffect(() => {
        
        verifySession();

        if(session) {
            router.push("/")   //This means redirects to home page if seeion exists i.e. if user logs in or registers
        }
    }, [session, router])

    if(session) {
        return null
    }
    if (!hydrated) return null; 

    // useEffect(() => {
    //     verifySession();
    // },[])

    return (
        <div className="" >
            <div className="" >{children}</div>
        </div>
    )

}

export default Layout