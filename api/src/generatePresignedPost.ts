import { APIGatewayProxyEventV2 } from "aws-lambda";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { response } from "./utils/response";
import { bodyParser } from "./utils/bodyParser";
import { randomUUID } from "node:crypto";
import { s3Client } from "./clients/s3Client";

export async function handler(event: APIGatewayProxyEventV2) {
  const { fileName, fileSize, fileType } = bodyParser(event.body);

  const MB_IN_BYTES = 1024 * 1024;
  const fileKey = `${fileName}-${randomUUID()}`;

  if (fileSize > MB_IN_BYTES) {
    return response({ statusCode: 400, body: { message: "O arquivo deve ter até 1MB." } });
  }

  const { fields, url } = await createPresignedPost(s3Client, {
    Bucket: process.env.BUCKET_NAME!,
    Key: `uploads/${fileKey}`,
    Expires: 600,
    // aqui estamos usando uma expressao diferente para criar uma policy
    // estamos dizendo que a variavel content-type deve comecar com image/
    // poderia ser "eq" (equals) em vez de starts-with
    Conditions: [
      ["starts-with", "$Content-Type", "image/"],
      ["content-length-range", fileSize, fileSize],
    ],
    Fields: { "Content-Type": fileType },
  });

  return response({ statusCode: 200, body: { fields, url } });
}
