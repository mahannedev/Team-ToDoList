'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) redirect('/error')

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error: signupError } = await supabase.auth.signUp({ email, password })

  if (signupError?.message.includes('User already registered')) {
    // Try logging in instead
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })

    if (loginError) redirect('/error')

    revalidatePath('/', 'layout')
    redirect('/dashboard')
  }

  if (signupError) {
    redirect('/error')
  }

  // success case
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}


export async function signout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) redirect('/error')

  revalidatePath('/', 'layout')
  redirect('/login')
}
