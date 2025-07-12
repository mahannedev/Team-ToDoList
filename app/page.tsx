import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if(user) redirect('/dashboard')
  return(
    <div>
      <p>welcome! please log in or sign up</p>
    </div>
  )
}
