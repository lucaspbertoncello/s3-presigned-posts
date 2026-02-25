import { httpClient } from "@/lib/httpClient";
import { getPresignedPost } from "./getPresignedPost";

export async function uploadFile(file: File) {
  // recebemos a url para upload para o s3 diretamente
  // e os fields (bucket, content-type, x-amz-...)
  // para embutirmos ele no formData
  const { fields, url } = await getPresignedPost(file);

  const formData = new FormData();

  // aqui usamos o .entries para ter acesso e chave/valor do objeto
  // [
  //   [X-AMZ-SECRET, XXX],
  //   [...]
  // ]
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // O Content-Type já vem em fields (da API). Não sobrescrever com file.type,
  // pois em alguns navegadores file.type pode ser "" ou inconsistente.
  formData.append("file", file);

  const { data } = await httpClient.post(url, formData);
  return data;
}
