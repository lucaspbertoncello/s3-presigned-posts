import { httpClient } from "@/lib/httpClient";
import type { PresignedPostResponse } from "@/types/upload";

type GetPresignedPostParams = File;

export async function getPresignedPost(params: GetPresignedPostParams) {
  const { data } = await httpClient.post<PresignedPostResponse>("/presigned-post", {
    fileName: params.name,
    fileSize: params.size,
    fileType: params.type,
  });

  return data;
}
