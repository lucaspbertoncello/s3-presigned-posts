import { httpClient } from "@/lib/httpClient";
import { getPresignedBatchPost } from "../presignedUrls/getPresignedBatchPost";

export async function batchUploadFile(files: File[]): Promise<void> {
  const { fields, url } = await getPresignedBatchPost(files);

  // se uma falhar, nao quebra as outras
  await Promise.allSettled(
    files.map(async (file) => {
      const formData = new FormData();
      const fileKey = `${fields.keyPrefix}${file.name}-${window.crypto.randomUUID()}`;

      Object.entries(fields).forEach(([key, value]) => {
        // ignora o campo key para sobrescrevermos depois
        if (key !== "key") {
          formData.append(key, value);
        }
      });

      // aqui sobrescrevemos a key para o arquivo ser unico (user1/lucas.jpg-1323213213, user1/lucas.jpg-15133)
      // evita sobrescrita de dados quando enviamos arquivos com os mesmos nomes para o s3
      formData.append("key", fileKey);
      // agora como tiramos o fields da lambda, precisamos adicionar manualmente o content-type
      formData.append("Content-Type", file.type);
      formData.append("file", file);

      await httpClient.post(url, formData);
    }),
  );
}
