import s3 from 'src/filter/config/aws';
import slug from '../formats/slug';

const upload = async (file: Express.Multer.File, folder: string) => {
  const newFileName = slug(file.originalname);
  const fileResponse = await s3
    .upload({
      Bucket: process.env.BUCKET_NAME,
      Key: `${folder}/${newFileName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
    .promise();

  return fileResponse.Location;
};

export default upload;
