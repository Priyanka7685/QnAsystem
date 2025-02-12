"use client";
import { useAuthStore } from "@/store/Auth"
import { useRouter } from "next/navigation"
import React from "react";

const Layout = ({children} : {children: React.ReactNode}) => {
    const {session, hydrated} = useAuthStore();
    const router = useRouter()

    React.useEffect(() => {
        if(session) {
            router.push("/")
        }
    }, [session, router])

    if(session) {
        return null
    }
    if (!hydrated) return null; 

    return (
        <div className="" >
            <div className="" >{children}</div>
        </div>
    )

}

export default Layout