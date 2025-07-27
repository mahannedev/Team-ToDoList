import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { signout } from "@/actions/authActions";
import TodoClient from "@/components/todo/TodoClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6 flex justify-between items-center">
        <p className="text-lg font-semibold">Welcome, {user.email}!</p>
        <form action={signout}>
          <button className="text-red-500 hover:underline">Sign out</button>
        </form>
      </div>
      <TodoClient />
    </div>
  );
}
