import { login } from "@/actions/actions" 
import Link from "next/link"

export default function LoginPage() {
  return (
    <form action={login} className="space-y-4">
      <input name="email" type="email" required placeholder="Email" className="border px-2 py-1" />
      <input name="password" type="password" required placeholder="Password" className="border px-2 py-1" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Log in</button>
      <p>Don't have an account? <Link href='/signup' className="border-2 border-white">sign up</Link></p>
    </form>
  )
}
