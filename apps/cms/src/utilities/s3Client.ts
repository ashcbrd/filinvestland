import { S3Client } from "@aws-sdk/client-s3";

const accessKeyId: any = process.env.ACCESS_KEY_ID;
const secretAccessKey: any = process.env.SECRET_ACCESS_KEY;

const region = process.env.REGION;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export default s3Client;
