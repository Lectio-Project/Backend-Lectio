import s3 from 'src/config/aws';

const deleteFile = async (url: string) => {
  await s3
    .deleteObject({
      Bucket: process.env.BUCKET_NAME,
      Key: url.split('/').pop(),
    })
    .promise();
};

export default deleteFile;
