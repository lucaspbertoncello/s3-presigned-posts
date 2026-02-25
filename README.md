# S3 Presigned Posts

A small project for uploading files directly to S3 using presigned POST. The frontend requests a signed URL from the API, builds a form with the required fields, and sends the file straight to the bucket without routing it through the server.

## What's in here

**fe** – React interface with a drag and drop area. Uses Vite, Tailwind, React Query and react-dropzone. The user picks a file, clicks Send, and the flow runs in two steps: first a call to the API to get the URL and signed fields, then a direct POST to S3.

**api** – AWS Lambda (Serverless Framework) that generates the presigned POST. It receives file name, size and type, validates (up to 1MB, images only) and returns the URL and fields for the upload. The S3 bucket is created by Serverless itself.

## How to run

Frontend:

```
cd fe
pnpm install
pnpm dev
```

The API is configured to point to an AWS endpoint. To use a local API or another environment, change the `baseURL` in `fe/src/lib/httpClient.ts`.

To deploy the API:

```
cd api
pnpm install
npx serverless deploy
```

Requires AWS credentials and provider environment variables (region, etc.).

## Tech stack

Frontend: React 19, Vite, Tailwind, React Query, Axios, react-dropzone, Base UI, Motion.

API: AWS Lambda, API Gateway HTTP API, S3, Serverless Framework, AWS SDK v3 (`@aws-sdk/s3-presigned-post`).
