import cloudinary from "../lib/config/cloudinary";

export const deleteFileFromCloudinary = async (
  publicId: string,
  folder: string
) => {
  try {
    return await cloudinary.uploader.destroy(`blog/${folder}/${publicId}`);
  } catch (error: any) {
    return new Error(error.message);
  }
};
