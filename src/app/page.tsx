import VideoFeed from "@/components/VideoFeed";
import { apiClient } from "@/lib/api-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const videos = await apiClient.getVideos();

  return (
    <div className="flex min-h-screen items-center  dark:bg-black">
      <VideoFeed videos={videos} />
    </div>
  );
}
