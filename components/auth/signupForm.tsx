'use client'

import { signup, type LoginState } from "@/actions/actions"
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton(){
    const { pending } = useFormStatus()

    return(
        <button
        type="submit"
        disabled={pending}
        className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"
        >
            {pending? 'siging in...':'Sign in'}
        </button>
    )
}


export default function SignupForm(){
    const initalState: LoginState = { error:null}
    const [ state,formAction ] = useActionState(signup,initalState);

    return(
    <form action={formAction} className="space-y-4">
      <input name="email" type="email" required placeholder="Email" className="border px-2 py-1" />
      <input name="password" type="password" required placeholder="Password" className="border px-2 py-1" />
      <SubmitButton />
      {state?.error && (
        <p className="text-red-600">⚠ {state.error}</p>
      )}
    </form>
    )
}