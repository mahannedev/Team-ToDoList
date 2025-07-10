'use client'

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Projects(){
    const { session } =  useAuth();
    const router = useRouter();

    useEffect(()=>{
        if(!session) router.push('/login')   
    },[session])

    return(
        <div>
            <h1>Projects demo page</h1>
        </div>
    )
}