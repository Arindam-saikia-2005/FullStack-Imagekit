import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { DbConnect } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({
                error: "Email and password are required"
            }, {
                status: 400
            })
        }

        await DbConnect()

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return NextResponse.json({
                message: "User already exist with this email"
            }, {
                status: 400
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({
            email,
            password: hashPassword
        })
        await newUser.save()

        return NextResponse.json({
            message: newUser
        }, {
            status: 201
        })
    } catch (error: any) {
        console.error("Error while registering a new user", error)
        return NextResponse.json({
            message: "Internal server error"
        }, {
            status: 500
        }
        )
    }
}