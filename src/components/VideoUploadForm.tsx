"use client";

import { apiClient } from "@/lib/api-client";
import React from "react";
import FileUpload from "./FileUpload";
import { useRouter } from "next/navigation";

function VideoUploadForm() {
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
  });

  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiClient.createVideo(form);
      router.push("/");
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <form onSubmit={handleOnSubmit}>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col gap-2">
            <label>Title</label>
            <input
              className="bg-gray-800 h-8.75 rounded-md"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Description</label>
            <input
              className="bg-gray-800 rounded-md h-25"
              type="text"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="gap-2">
            <p>upload video And Select a Thumbnail</p>
            <FileUpload
              fileType="video"
              onSucees={(res) => {
                setForm((prev) => ({
                  ...prev,
                  videoUrl: res.filePath,
                  thumbnailUrl: res.thumbnailUrl,
                }));
              }}
              onProgress={(progress) => {
                console.log(`Upload progress: ${progress}%`);
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!form.videoUrl || loading}
            className="h-8.75 rounded-md bg-blue-600 disabled:opacity-50"
          >
            Publish Video
          </button>
        </div>
      </form>
    </div>
  );
}

export default VideoUploadForm;
