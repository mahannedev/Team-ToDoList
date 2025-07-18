import { motion } from 'framer-motion'
import { FiMail, FiLock } from 'react-icons/fi'

export default function AuthFormLayout({
  children,
  isLogin = true
}: {
  children: React.ReactNode
  isLogin?: boolean
}) {
  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-gray-50'>
      {/* Left Gradient Panel */}
      <div className='w-full md:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8'>
        <div className="max-w-lg px-4">
          <h2 className='text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight'>
            Let's Build The Bright Future.
          </h2>
          <p className="mt-6 text-lg text-gray-300">
            {isLogin ? "Welcome back to your productivity hub" : "Join us to start your journey"}
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className={`w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12 bg-white ${isLogin ? "shadow-lg" : "shadow-lg"}`}>
        {children}
      </div>
    </div>
  )
}