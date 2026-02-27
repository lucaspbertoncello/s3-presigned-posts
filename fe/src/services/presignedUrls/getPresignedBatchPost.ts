import { httpClient } from "@/lib/httpClient";
import type { PresignedPostResponse } from "@/types/upload";

type GetPresignedBatchPostParams = File[];

export async function getPresignedBatchPost(params: GetPresignedBatchPostParams) {
  // aqui fazemos um map para renderizar todas as propriedades de arquivos enviados
  const { data } = await httpClient.post<PresignedPostResponse>("/batch-presigned-post", {
    files: params.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
    })),
  });

  return data;
}
