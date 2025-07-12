
import SignupForm from "@/components/auth/signupForm"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="space-y-4">
      <SignupForm />
      <p>Already have an account <Link href='/login' className="border-2 border-white">log in</Link></p>
    </div>
  )
}
