import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb()
        const { role, mobile } = await req.json()
        const session = await auth()
        const user = await User.findByIdAndUpdate({ email: session?.user?.email }, { role, mobile })
        if (!user) {
            return NextResponse.json(
                { message: "User Not Found" },
                { status: 400 }
            )
        }
        return NextResponse.json(
            user,
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: `Edit Role and Mobile Error ${error}` },
            { status: 500 }
        )
    }
}