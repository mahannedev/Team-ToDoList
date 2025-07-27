'use client'

import { login, type LoginState } from "@/actions/authActions"
import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"
import { FiMail, FiLock } from "react-icons/fi"
import Link from "next/link"
//zod:
import { z } from "zod"
import { loginSchema,type LoginFormData } from "@/schemas/loginSchema"


function SubmitButton({ isLogin = true }: { isLogin?: boolean }) {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                isLogin 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "bg-green-600 hover:bg-green-700"
            } transition-colors disabled:opacity-70`}
        >
            {pending ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
        </button>
    )
}

export default function LoginForm() {
    //states for server actions
    const initialState: LoginState = { error: null }
    const [state, formAction] = useActionState(login, initialState)
    //states for login error with zod 
    const [ formData , setFormData ] = useState<LoginFormData>({email:"",password:""})
    const [ errors,setErrors ] = useState<Partial<Record<keyof LoginFormData, string>>>({})

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const { name, value } = e.target;
   setFormData(prev => ({ ...prev, [name]: value }));

   const result = loginSchema.safeParse({ ...formData, [name]: value });
  if (!result.success) {
    const tree = z.treeifyError(result.error);
    const fieldError =
  (tree.properties as Record<keyof LoginFormData, { errors?: string[] }>)[
    name as keyof LoginFormData
  ]?.errors?.[0] ?? "";

    setErrors(prev => ({ ...prev, [name]: fieldError }));
  } else {
    setErrors(prev => ({ ...prev, [name]: "" }));
  }
};

const handleFormSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  formData: LoginFormData,
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof LoginFormData, string>>>>
) => {
  const result = loginSchema.safeParse(formData);

  if (!result.success) {
    e.preventDefault(); // Block form submission

    const errorTree = z.treeifyError(result.error);
    const props = errorTree.properties ?? {};

    setErrors({
      email: props.email?.errors?.[0] ?? "",
      password: props.password?.errors?.[0] ?? "",
    });

    return false;
  }

  // Clear previous errors if form is valid
  setErrors({ email: "", password: "" });
  // Allow form to submit
  return true;
};

    return (
      <form 
      action={formAction} 
      onSubmit={(e)=>handleFormSubmit(e,formData,setErrors)} 
      className="space-y-6">
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}             
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Forgot password?
          </Link>
        </div>

        <SubmitButton isLogin={true} />

        {state?.error && (
          <div className="rounded-md bg-red-50 p-3">
            <p className="text-sm text-red-600 text-center">⚠ {state.error}</p>
          </div>
        )}

        <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </div>
      </form>
    );
}