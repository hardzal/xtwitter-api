import { Request } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

export default async function uploadImage(folder: string, req: Request) {
  let imageUrl: string = '';

  imageUrl = await new Promise((resolve, reject) => {
    try {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
        },
        (error, result) => {
          if (error) return console.error(error);
          resolve(result?.secure_url || '');
        }
      );
      streamifier.createReadStream(req?.file?.buffer || '').pipe(stream);
    } catch (error) {
      console.log('error upload');
      reject(error);
    }
  });

  return imageUrl;
}
