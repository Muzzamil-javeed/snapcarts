"use client"
import { ArrowLeft, EyeIcon, EyeOff, Leaf, Loader2, Lock, LogIn, Mail, User } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import googleImg from '@/assets/google-img.png'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

type proType = {
  preStep: (s: number) => void
}

function RegisterForm({ preStep }: proType) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, SetShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await axios.post('/api/auth/register', {
        name,
        email,
        password
      })

      console.log("✅ Registration successful:", result.data)

      // Success message dikhaao
      alert("Registration successful! Redirecting to login...")

      // Login page pe redirect karo
      router.push('/login')

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Registration failed"
        console.log("❌ Registration error:", errorMessage)
        setError(errorMessage)
      } else {
        console.log("❌ Unexpected error:", error)
        setError("An unexpected error occurred")
      }
      setLoading(false)
    }
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative'>
        <div className='absolute top-6 left-6 flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors cursor-pointer'
          onClick={() => { preStep(1) }}>
          <ArrowLeft className='h-5 w-5' />
          <span className='font-medium'>Back</span>
        </div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .6, delay: .5 }}
          className='text-4xl font-extrabold text-green-700 mb-2'>
          Create Account
        </motion.h1>

        <p className='text-gray mb-8 items-center flex gap-2'>
          Join Snapcart Today <Leaf className='w-5 h-5 text-green-600' />
        </p>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='w-full max-w-sm mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center'>
            {error}
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: .6 }}
          className='flex flex-col gap-5 w-full max-w-sm'
          onSubmit={handleRegister}
        >
          <div className='relative'>
            <User className='absolute left-3 top-3.5 w-5 h-5 text-gray-400' />
            <input
              type="text"
              placeholder='Enter Your Name'
              className='outline-none w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500'
              onChange={(e) => setName(e.target.value)}
              value={name}
              disabled={loading}
            />
          </div>

          <div className='relative'>
            <Mail className='absolute left-3 top-3.5 w-5 h-5 text-gray-400' />
            <input
              type="email"
              placeholder='Enter Your Email'
              className='outline-none w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={loading}
            />
          </div>

          <div className='relative'>
            <Lock className='absolute left-3 top-3.5 w-5 h-5 text-gray-400' />
            <input
              type={showPassword ? "text" : "password"}
              placeholder='Enter Your Password (min 6 chars)'
              className='outline-none w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              disabled={loading}
            />
            {showPassword ? (
              <EyeOff
                className='absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer'
                onClick={() => SetShowPassword(false)}
              />
            ) : (
              <EyeIcon
                className='absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer'
                onClick={() => SetShowPassword(true)}
              />
            )}
          </div>

          {(() => {
            const formValidation = name !== "" && email !== "" && password !== ""
            return (
              <button
                type="submit"
                disabled={!formValidation || loading}
                className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2 ${formValidation && !loading
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}>
                {loading ? (
                  <Loader2 className='w-5 h-5 animate-spin' />
                ) : (
                  "Register"
                )}
              </button>
            )
          })()}

          <div className='flex items-center gap-2 text-gray-700 text-sm mt-2'>
            <span className='flex-1 h-px bg-gray-200'></span>
            OR
            <span className='flex-1 h-px bg-gray-200'></span>
          </div>

          <button
            type="button"
            onClick={() => signIn("google")}
            className='w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200'>
            <Image src={googleImg} width={20} height={20} alt='Google' />
            Continue with Google
          </button>
        </motion.form>

        <p
          className='text-gray-600 mt-6 text-sm flex items-center gap-1 cursor-pointer'
          onClick={() => router.push('/login')}>
          Already have an Account?
          <LogIn className='w-5 h-5' />
          <span className='text-green-500'>Sign In</span>
        </p>
      </div >
    </>
  )
}

export default RegisterForm