"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useState } from "react";

interface FileUploadProps {
  onSucees: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

// UploadExample component demonstrates file uploading using ImageKit's Next.js SDK.
const FileUpload = ({ onSucees, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // opional validation
  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("PLease uploa a valid video");
      }
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
    }
    return true;
  };

  const handleFileChage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      const AuthRes = await fetch("/api/auth/imagekit-auth");
      const auth = await AuthRes.json();

      const uploadRespone = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEYS!,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 100;
            onProgress(Math.round(percent));
          }
        },
      });

      onSucees(uploadRespone);
    } catch (error: any) {
      console.error("Error while uploading a video or image", error.message);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChage}
      />
      {uploading && <span>Loading......</span>}
    </>
  );
};

export default FileUpload;
