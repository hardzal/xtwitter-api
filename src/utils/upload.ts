import { Request } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

export async function uploadImageSingle(folder: string, req: Request) {
  let imageUrl: string = '';
  if (req?.file) {
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
  }

  return imageUrl;
}

export async function uploadImageMulti(
  folders: Array<string>,
  req: Record<string, Express.Multer.File[]>
) {
  let imageUrl: string = '';
  const imageResults: Record<string, string> = {};

  let index = 0;
  for (const key in req) {
    imageUrl = await new Promise((resolve, reject) => {
      try {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: folders[index],
          },
          (error, result) => {
            if (error) return console.error(error);
            resolve(result?.secure_url || '');
          }
        );

        streamifier.createReadStream(req[key][0]?.buffer || '').pipe(stream);
        index++;
      } catch (error) {
        console.log('error upload');
        reject(error);
      }
    });
    imageResults[key] = imageUrl;
  }

  return imageResults;
}
