import mongoose from 'mongoose'
import Link from 'next/link'
import React from 'react'

interface IUser {
    _id?: mongoose.Types.ObjectId
    name: string
    email: string
    password?: string
    mobile?: string
    role: "user" | "admin" | "deliveryBoy"
    image?: string
}

function Nav({ user }: { user: IUser }) {
    console.log(user)
    return (
        <div className="w-[95%] fixed top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-700 rounded-2xl shadow-lg shadow-black/30 flex justify-between items-center h-20 px-4 md:px-8 z-50">
            <Link href={"/"}>
                SnapCart
            </Link>
        </div>
    )
}

export default Nav
