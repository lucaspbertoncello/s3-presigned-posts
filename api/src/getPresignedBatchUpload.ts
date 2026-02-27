import { APIGatewayProxyEventV2 } from "aws-lambda";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { response } from "./utils/response";
import { bodyParser } from "./utils/bodyParser";
import { s3Client } from "./clients/s3Client";

export async function handler(event: APIGatewayProxyEventV2) {
  const { files } = bodyParser(event.body);

  // Valida que nenhum arquivo está com campos faltando
  // findIndex retorna -1 se não encontrar nenhum inválido
  const invalidFileIndex = files.findIndex((file) => {
    if (!file.name || !file.type || !file.size) {
      // ← !file.size, não file.size
      return true;
    }
  });

  if (invalidFileIndex >= 0) {
    return response({
      statusCode: 400,
      body: {
        message: `fileName, fileType and fileSize are required. Invalid file at index ${invalidFileIndex}: ${files[invalidFileIndex].name ?? "unnamed"}`,
      },
    });
  }

  // Define content-length-range com base no menor e maior arquivo do batch
  // Isso garante que o S3 rejeite arquivos fora desse intervalo durante o upload
  const lowestFileSize = Math.min(...files.map((file) => file.size));
  const biggestFileSize = Math.max(...files.map((file) => file.size));

  const { fields, url } = await createPresignedPost(s3Client, {
    Bucket: process.env.BUCKET_NAME!,
    // "${filename}" no final faz a SDK injetar uma condition starts-with ["starts-with", "key", "user123/"]
    // em vez de fixar a key exata. O S3 aceita qualquer key que comece com "user-123/"
    Key: "user-123/${filename}",
    Expires: 600,
    Conditions: [
      ["starts-with", "$Content-Type", "image/"],
      ["content-length-range", lowestFileSize, biggestFileSize],
    ],
    // Fields foi removido intencionalmente.
    // Quando definimos Fields: { "Content-Type": fileType }, estamos fixando
    // o Content-Type na policy assinada. Isso invalida o upload de qualquer arquivo
    // com um tipo diferente — o que é problemático num batch com tipos variados.
    // A condition ["starts-with", "$Content-Type", "image/"] já cobre a validação
    // de forma flexível: aceita image/jpeg, image/png, image/webp, etc.
    // O cliente deve enviar o Content-Type correto no form — não precisamos fixá-lo aqui.
    Fields: {
      keyPrefix: "user-123/",
    },
  });

  return response({ statusCode: 200, body: { fields, url } });
}
