import s3 from 'src/config/aws';
import slug from '../formats/slug';

const upload = async (file: Express.Multer.File) => {
  const newFileName = slug(file.originalname);
  const fileResponse = await s3
    .upload({
      Bucket: process.env.BUCKET_NAME,
      Key: newFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
    .promise();

  return fileResponse.Location;
};

export default upload;
