"use client"
import React from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Bike, ShoppingBasket } from 'lucide-react'

type propType = {
  nextStep: (s: number) => void
}

function welcome({ nextStep }: propType) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-6 bg-linear-to-b from-green-100 to-white'>
      <motion.div
        initial={{
          opacity: 0,
          y: -10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: .6
        }}
      >
        <div className='flex gap-3 items-center'>
          <ShoppingBasket className='w-10 h-10 text-green-600' />
          <h1 className='text-4xl md-text-5xl font-extrabold text-green-700'>SnapCart</h1>
        </div>
      </motion.div>

      <motion.p
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: .6,
          delay: .3
        }}
        className='text-lg max-w-lg md-text-xl text-gray-500 mt-4'
      >
        Your one-stop destination for fresh groceries, organic produce, and daily essentials delivered right to your doorstep
      </motion.p>

      <motion.div
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
        className='flex gap-10 items-center mt-10'
      >
        <ShoppingBasket className='w-24 h-24 md:w-32 text-green-600' />
        <Bike className='w-24 h-24 md:w-32 text-orange-600' />
      </motion.div>

      <motion.button
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: .6,
          delay: .8
        }}
        className='mt-10 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-md trasnition-all duration-200'
        onClick={() => { nextStep(2) }}
      >
        Next
        <ArrowRight />
      </motion.button>
    </div>
  )
}

export default welcome
