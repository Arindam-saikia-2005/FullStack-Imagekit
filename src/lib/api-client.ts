import { IVideo } from "@/models/video";

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};

export type VideoFormData = Omit<IVideo, "_id">;

class ApiClient {
  private async fetch<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
      ...headers,
    };

    // Use server-only base URL; relative URL on the client
    const baseUrl =
      typeof window === "undefined"
        ? process.env.NEXT_BASE_URL ?? "http://localhost:3000"
        : "";

    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store", // safe default for dynamic data
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json() as Promise<T>;
  }

  async getVideos(): Promise<IVideo[]> {
    const { videos } = await this.fetch<{ videos: IVideo[] }>("video");
    return videos;
  }

  async createVideo(videoData: VideoFormData): Promise<IVideo> {
    const { newVideo } = await this.fetch<{ newVideo: IVideo }>("video", {
      method: "POST",
      body: videoData,
    });
    return newVideo;
  }
}

export const apiClient = new ApiClient();
