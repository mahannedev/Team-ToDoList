import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { signout } from '@/actions/authActions'

export default async function Projects() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return( 
  <div>
   <p> Welcome, {user.email}!</p>
    <button onClick={signout}>sign out</button>
  </div>
  )
}
