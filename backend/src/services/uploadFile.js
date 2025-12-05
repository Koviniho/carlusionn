import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime-types';
import { AWS_BUCKET, AWS_REGION } from '../config/env.config.js';

const s3Client = new S3Client({ region: AWS_REGION });

const uploadFile = async (file) => {
  const mimeType = mime.lookup(file.originalname);

  let folder = '';
  if (mimeType.startsWith('image/')) {
    folder = 'images';
  } else if (
    mimeType === 'application/msword' || 
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
    mimeType === 'application/pdf'
  ) {
    folder = 'docs';
  } else {
    throw new Error('Unsupported file type');
  }

  // Generate a unique filename by appending the timestamp
  const uniqueFilename = `${Date.now()}-${file.originalname}`;

  const params = {
    Bucket: AWS_BUCKET,
    Key: `${folder}/${uniqueFilename}`, // Use unique filename
    Body: file.buffer,
    ContentType: mimeType,
  };

  // Uploading the file to S3
  const command = new PutObjectCommand(params);
  const data = await s3Client.send(command);

  return {
    Location: `https://${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${params.Key}`,
    ...data,
  };
};

export default uploadFile;
