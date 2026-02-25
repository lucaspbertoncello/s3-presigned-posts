import { APIGatewayProxyEventV2 } from "aws-lambda";
import { response } from "./utils/response";
import { bodyParser } from "./utils/bodyParser";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "./clients/s3Client";

export async function handler(event: APIGatewayProxyEventV2) {
  const { fileName, fileSize, fileType } = bodyParser(event.body);

  const MB_IN_BYTES = 1024 * 1024;

  if (fileSize > MB_IN_BYTES) {
    return response({ statusCode: 400, body: { message: "O arquivo deve ter até 1MB." } });
  }

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: `uploads/${fileName}-${randomUUID()}`,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 600 });

  return response({ statusCode: 200, body: url });
}
