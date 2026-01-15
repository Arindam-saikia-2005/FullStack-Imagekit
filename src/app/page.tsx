import VideoFeed from "@/components/VideoFeed";
import { apiClient } from "@/lib/api-client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {

  const cookieStore = await cookies()
  const token =  cookieStore.get("token")

  if(!token) {
    redirect("/login")
  }

  const videos = await apiClient.getVideos()

  return (
    <div className="flex min-h-screen items-center  dark:bg-black">
     <VideoFeed videos={videos} />
    </div>
  );
}
