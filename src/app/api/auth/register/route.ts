import connectDb from "@/lib/db";
import User from "@/models/userModels";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // yee connect hamaisha call hu ga jab b api likhygy
        await connectDb()
        const { name, email, password } = await req.json()

        // User ki mail yaha Check Hu rhi hai 
        const existUser = await User.findOne({ email })
        if (existUser) {
            return NextResponse.json(
                { message: "email already exit" },
                { status: 400 }
            )
        }

        // passowrd yah chk hu rha hai
        if (password.length < 6) {
            return NextResponse.json(
                { message: "password must be 6 Char" },
                { status: 400 }
            )
        }

        // Hashpassword yaha Lag rha hai
        const hashPassword = await bcrypt.hash(password, 10)

        // Yaha User Create hu rha hai
        const user = await User.create({
            name, email, password: hashPassword
        })

        // User Create huny k bad kia response jye ga wo yah sai return hu rha hai
        return NextResponse.json(
            user,
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: `server error ${error}` },
            { status: 500 }
        )
    }
}