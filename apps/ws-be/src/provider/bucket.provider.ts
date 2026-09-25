import { S3Client } from "@aws-sdk/client-s3";

export const r2Client = new S3Client({
  region: process.env.REGION,
  endpoint: process.env.ENDPOINT,
  credentials: {
    accessKeyId: process.env.B2_ACCESS_KEY_ID!,
    secretAccessKey:process.env.B2_SECRET_ACCESS_KEY!
  }
})
