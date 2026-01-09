"use client"
import { ArrowLeft, Leaf } from 'lucide-react'
import React from 'react'
import { motion } from 'motion/react'
type proType = {
  preStep: (s: number) => void
}

function RegisterForm({ preStep }: proType) {

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative'>
        <div className='absolute top-6 left-6 flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors cursor-pointer'
          onClick={() => { preStep(1) }}>
          <ArrowLeft className='h-5 w-5' />
          <span className='font-medium' >Back</span>
        </div>
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
          Create Account
        </motion.h1>
        <p className='text-gray mb-8 items-center flex gap-2'>Join Snapcart Today <Leaf className='w-5 h-5 text-green-600' /> </p>
        <div>
          <form action=""></form>
        </div>
      </div>
    </>
  )
}

export default RegisterForm
