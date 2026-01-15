import VideoUploadForm from "@/components/VideoUploadForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


async function page() {

//  const cookie = await cookies();
//  const token =  cookie.get("token")

//  if(!token) {
//   redirect("/login")
//  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upload New Reel</h1>
        <VideoUploadForm/>
      </div>
    </div>
  );
}

export default page;
