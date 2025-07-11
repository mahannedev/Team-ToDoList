import { signup } from "@/actions/actions"
import Link from "next/link"

export default function SignupPage() {
  return (
    <form action={signup} className="space-y-4">
      <input name="email" type="email" required placeholder="Email" className="border px-2 py-1" />
      <input name="password" type="password" required placeholder="Password" className="border px-2 py-1" />
      <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">Sign up</button>
      <p>Already have an account <Link href='/login' className="border-2 border-white">log in</Link></p>
    </form>
  )
}
