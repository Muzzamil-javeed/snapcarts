"use client"
import React, { useState } from 'react'
import { motion } from 'motion/react'
import { AmpersandIcon, ArrowRight, Bike, User } from 'lucide-react'
import axios from 'axios'
import { redirect } from 'next/navigation'
function EditRoleMobile() {
    const [roles, setRoles] = useState([
        { id: "admin", label: "Admin", icon: AmpersandIcon },
        { id: "user", label: "User", icon: User },
        { id: "deliveryBoy", label: "Delivery Boy", icon: Bike }
    ])
    const [selectRole, setSelectRole] = useState("")
    const [mobile, setMobile] = useState("")

    const handleEdit = async () => {
        try {
            const result = await axios.post('/api/user/edit-mobile-role', {
                role: selectRole,
                mobile
            })
            redirect("/")
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className='flex flex-col items-center min-h-screen p-6 w-full'>
            <motion.h1
                initial={{
                    opacity: 0,
                    y: -20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.4
                }}
                className='text-3xl md:text-4xl font-extrabold text-green-700 text-center mt-8'
            >
                Select Your Role
            </motion.h1>
            <div className='flex flex-col md:flex-row justify-center items-center gap-6 mt-10'>
                {
                    roles.map((role) => {
                        const Icon = role.icon
                        const isSelected = selectRole == role.id
                        return (
                            <motion.div
                                key={role.id}
                                whileTap={{ scale: 0.94 }}
                                onClick={() => setSelectRole(role.id)}
                                className={`flex flex-col items-center justify-center w-48 h-48 rounded-2xl border-2xl border-2
                                        transition-all ${isSelected
                                        ? "border-green-600 bg-green-100 shadow-lg"
                                        : "border-gray-300 bg-white hover:border-green-400"
                                    }`}
                            >
                                <Icon />
                                <span>{role.label}</span>
                            </motion.div>

                        )
                    })
                }
            </div>
            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    delay: 0.5,
                    duration: 0.4
                }}
                className='flex flex-col items-center mt-10'
            >
                <label
                    htmlFor="mobile"
                    className='mb-2 text-gray-700 font-medium'>Enter Your Mobile Number</label>
                <input
                    type="tel"
                    placeholder='eg. 1234567890'
                    className='w-64 md:w-80 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 
                    focus:ring-green-500 focus:outline-none text-gray-800'
                    onChange={(e) => setMobile(e.target.value)}
                    id='mobile' />


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
                    delay: 0.7,
                }}
                onClick={handleEdit}
                disabled={mobile.length !== 10 || !selectRole}
                className={`inline-flex items-center gap-2 font-semibold py-3 px-8 rounded-2xl shadow-md w-[200px] mt-10
                transition-all duration-200 ${selectRole && mobile.length === 10
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
            >

                Go to Home <ArrowRight />
            </motion.button>


        </div >
    )
}

export default EditRoleMobile
