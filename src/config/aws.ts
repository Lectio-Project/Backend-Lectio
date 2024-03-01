import * as aws from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const endpoint = new aws.Endpoint(process.env.BUCKET_URL);

const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.BUCKET_KEY_ID,
    secretAccessKey: process.env.BUCKET_APP_KEY,
  },
});

export default s3;
