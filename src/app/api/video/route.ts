import { authOptions } from "@/lib/auth";
import { DbConnect } from "@/lib/db";
import Video, { IVideo } from "@/models/video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        await DbConnect()
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean()

        if (!videos || videos.length === 0) {
            return NextResponse.json([], { status: 400 })
        }

        return NextResponse.json({
            videos
        })
    } catch (error: any) {
        console.error("Failed to fetch videos", error.message)
        return NextResponse.json({
            error: "Internal server error"
        }, {
            status: 500
        })
    }
}


export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user.id) {
            return NextResponse.json({
                message: "UnAuthoirzed"
            }, {
                status: 401
            })
        }

        await DbConnect()

        const body: IVideo = await req.json();

        if (!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl) {
            return NextResponse.json({
                errror: "All fields are required"
            }, {
                status: 400
            })
        }

        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100
            }
        }
        const newVideo = await Video.create(videoData)

        await newVideo.save()

        return NextResponse.json({
            newVideo
        })

    } catch (error: any) {
        console.error("Failed to create a video", error.message)
        return NextResponse.json({
            error: "Internal server error"
        }, {
            status: 500
        })
    }
}