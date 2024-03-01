import s3 from 'src/config/aws';

const deleteFile = async (url: string, folder: string) => {
  const path = `${folder}/${url.split('/').pop()}`;
  console.log(url);

  console.log(path);

  await s3
    .deleteObject({
      Bucket: process.env.BUCKET_NAME,
      Key: path,
    })
    .promise();
};

export default deleteFile;
