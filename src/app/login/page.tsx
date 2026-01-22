"use client"
import { ArrowLeft, EyeIcon, EyeOff, Leaf, Loader, Loader2, Lock, LogIn, Mail, User } from 'lucide-react'
import React, { FormEvent, useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import googleImg from '@/assets/google-img.png'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, SetShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const session = useSession()
    console.log(session)

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();  // ✅ Fixed
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false  // Don't auto-redirect
            });

            if (result?.error) {
                console.log("Login failed:", result.error);
                // You can show an error message to the user here
                alert("Login failed: " + result.error);
            } else {
                // Login successful
                console.log("Login successful!");
                router.push('/');  // Redirect to home or dashboard
            }
        } catch (error) {
            console.log("Error during login:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className='flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative'>
                <motion.h1
                    initial={{
                        opacity: 0,
                        scale: 0.9
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}
                    transition={{
                        duration: .6,
                        delay: .5
                    }}
                    className='text-4xl font-extrabold text-green-700 mb-2'>
                    Welcome Back
                </motion.h1>
                <p className='text-gray mb-8 items-center flex gap-2'>Login to Snapcart <Leaf className='w-5 h-5 text-green-600' /> </p>
                <motion.form
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    transition={{
                        duration: .6
                    }}
                    className='flex flex-col gap-5 w-full max-w-sm'
                    onSubmit={handleLogin}
                >

                    <div className='relative'>
                        <Mail className='absolute left-3 top-3.5 w-5 h-5 text-gray-400' />
                        <input type="text" placeholder='Enter Your Email' className='outline-none w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline:none'
                            onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
                        />
                    </div>


                    <div className='relative'>
                        <Lock className='absolute left-3 top-3.5 w-5 h-5 text-gray-400' />
                        <input type={showPassword ? "text" : "password"} placeholder='Enter Your Password' className='outline-none w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline:none'
                            onChange={(e) => { setPassword(e.target.value) }}
                            value={password}
                        />
                        {
                            showPassword ? <EyeOff className='absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer'
                                onClick={() => SetShowPassword(false)} /> :
                                <EyeIcon className='absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer'
                                    onClick={() => SetShowPassword(true)}
                                />
                        }
                    </div>

                    {
                        (() => {
                            const formValidation = email !== "" && password !== ""
                            return <button disabled={!formValidation || loading}
                                className={`
                                w-full font-semibold py-3 rounded-xl transition-all duration-200 shadow-md   
                                 items-center text-center justify center gap-2 ${formValidation ? "bg-green-600 hover:bg-green-700 text-white"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}>
                                {loading ? <Loader2 className='w-5 h-5 animate-spin items-center text-center justify center' /> : "Login"}
                            </button>
                        })()
                    }

                    <div className='flex items-center gap-2 text-gray-700 text-sm  mt-2'>
                        <span className='flex-1 h-px bg-gray-200'></span>
                        OR
                        <span className='flex-1 h-px bg-gray-200'></span>
                    </div>

                    <button onClick={() => signIn("google")} className='w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200'>
                        <Image src={googleImg} width={20} height={20} alt='Image' />
                        Continue with Google
                    </button>

                </motion.form>
                <p className='text-gray-600 mt-6 text-sm flex items-center gap-1'
                    onClick={() => router.push('/register')}
                >Want To Create an Account? <LogIn className='w-5 h-5' /><span className='text-green-500'>Sign Up</span></p>
            </div>
        </>
    )
}

export default Login
