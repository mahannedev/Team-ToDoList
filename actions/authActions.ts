"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export type LoginState = {
  error: string | null;
};
export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState | never> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    let customMessage = "An error occured please try again";

    if (error.message.includes("Invalid login credentials")) {
      customMessage = "Please enter a valid Password and Email";
    } else if (error.message.includes("Email not confirmed")) {
      customMessage = "Please verify your Email First";
    }
    return { error: customMessage };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState | never> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await supabase.auth.signOut();

  const { error: signupError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signupError?.message.includes("User already registered")) {
    // Try logging in instead
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      let cutsomMessage = "An error occured please try again";
      if (loginError.message.includes("Invalid login credentials")) {
        cutsomMessage = "Please choose a valid Password and Email";
      }
      return { error: cutsomMessage };
    }

    revalidatePath("/", "layout");
    redirect("/dashboard");
  }

  if (signupError) {
    let signupMessage = "An error occured please try again";

    if (signupError.message.includes("Password should be")) {
      signupMessage = "Password must include at least 6 characters";
    } else if (signupError.message.includes("Invalid email")) {
      signupMessage = "Plese enter a valid Email";
    }
    return { error: signupMessage };
  }

  // success case
  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) redirect("/error");

  revalidatePath("/", "layout");
  redirect("/login");
}
