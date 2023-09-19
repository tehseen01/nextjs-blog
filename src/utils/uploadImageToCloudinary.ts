import cloudinary from "../lib/config/cloudinary";

export const uploadImageToCloudinary = async (file: string, folder: string) => {
  try {
    return await cloudinary.uploader.upload(file, {
      folder: folder,
    });
  } catch (error: any) {
    return new Error(error.message);
  }
};
