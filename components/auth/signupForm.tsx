// components/auth/SignupForm.tsx
'use client'

import { signup, type LoginState } from "@/actions/actions"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { FiMail, FiLock } from "react-icons/fi"
import Link from "next/link"

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-70"
        >
            {pending ? 'Creating account...' : 'Sign Up'}
        </button>
    )
}

export default function SignupForm() {
    const initialState: LoginState = { error: null }
    const [state, formAction] = useActionState(signup, initialState)

    return (
        <form action={formAction} className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        name="password"
                        type="password"
                        required
                        placeholder="••••••••"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
            </div>

            <SubmitButton />

            {state?.error && (
                <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-600 text-center">
                        ⚠ {state.error}
                    </p>
                </div>
            )}

            <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link 
                    href="/login" 
                    className="font-medium text-green-600 hover:text-green-500"
                >
                    Log in
                </Link>
            </div>
        </form>
    )
}