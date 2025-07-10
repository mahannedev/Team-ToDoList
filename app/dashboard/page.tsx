'use client'

import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard(){
  const { session } = useAuth();
  const router = useRouter();

  useEffect(()=>{
    if(!session) router.push('/login');
  },[session])
  return(
    <div>
      <h1>this is the Dashboard demo</h1>
      <button onClick={()=>supabase.auth.signOut().then(()=>router.push('/login'))}>
        Logout
      </button>
    </div>
  );

}