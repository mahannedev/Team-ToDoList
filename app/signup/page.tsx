'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignUpPage(){
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const router = useRouter();

  const handleSignUp = async ()=>{
    const { error } = await supabase.auth.signUp({email,password});
    if(!error) router.push('/dashboard');
    else alert(error.message);
  };

  return(
    <div>
      <h1>Sign Up</h1>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  )
}
