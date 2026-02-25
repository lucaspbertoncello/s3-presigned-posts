import { httpClient } from "@/lib/httpClient";

type GetPresignedPostParams = File;
type GetPresignedPostResponse = { fields: Record<string, string>; url: string };

export async function getPresignedPost(params: GetPresignedPostParams) {
  const { data } = await httpClient.post<GetPresignedPostResponse>("/presigned-post", {
    fileName: params.name,
    fileSize: params.size,
    fileType: params.type,
  });

  return data;
}
