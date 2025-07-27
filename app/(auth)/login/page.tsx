import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/loginForm";
import AuthFormLayout from "@/components/layout/AuthFormLayout";

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (
    <AuthFormLayout isLogin={true}>
      <h2 className="text-3xl font-bold mb-2 text-gray-900">Welcome Back</h2>
      <p className="text-gray-500 mb-8">Sign in to your account</p>
      <LoginForm />
    </AuthFormLayout>
  );
}
