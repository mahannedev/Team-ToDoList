import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/loginForm";
import Link from "next/link";

export default async function LoginPage() {
  const supabase = await createClient();

  const { 
    data:{ user }
   } = await supabase.auth.getUser();

   if(user){
    redirect('/dashboard')
   }
  return (
      <div className="space-y-4">
      <LoginForm />
      <p>Don't have an account? <Link href='/signup' className="border-2 border-white">sign up</Link></p>
      </div>
  )
}
