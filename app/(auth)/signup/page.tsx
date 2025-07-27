// import { createClient } from "@/utils/supabase/server"
// import { redirect } from "next/navigation"
import SignupForm from "@/components/auth/signupForm";

export default async function SignupPage() {
  // const supabase = await createClient()
  // const { data: { user } } = await supabase.auth.getUser()

  // if (user) redirect('/dashboard')

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Left Gradient Panel */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8">
        <div className="max-w-lg px-4">
          <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Let&apos;s Build The Bright Future.
          </h2>
          <p className="mt-6 text-lg text-gray-300">
            Join us to start your journey
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12 bg-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">
          Create Account
        </h2>
        <p className="text-gray-500 mb-8">Get started with your journey</p>
        <SignupForm />
      </div>
    </div>
  );
}
