'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LoginPage(){
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const router = useRouter();

  const handleLogin = async () =>{
    const { error } = await supabase.auth.signInWithPassword({email,password});
    if(!error) router.push('/dashboard');
    else alert(error.message);
  }
  
  return(
    <div>
      <h1>login</h1>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}