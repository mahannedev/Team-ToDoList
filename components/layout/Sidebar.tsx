// components/layout/Sidebar.tsx
import { FiUsers, FiCalendar, FiLogOut, FiUser, FiActivity } from 'react-icons/fi'
import { signout } from '@/actions/authActions'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import NavLink from '@/components/ui/NavLink'

export default async function Sidebar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">MatrixProg</h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            <NavLink href="/dashboard" icon={<FiActivity />} label="Dashboard" />
            <NavLink href="/projects" icon={<FiCalendar />} label="Projects" />
            <NavLink href="/teams" icon={<FiUsers />} label="Teams" />
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <FiUser />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.email}</p>
              <form action={signout}>
                <button type="submit" className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center">
                  <FiLogOut className="mr-1" /> Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}