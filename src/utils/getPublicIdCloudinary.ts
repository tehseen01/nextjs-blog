export const getPublicIdCloudinary = (imageURL: string) => {
  const publicID = imageURL.split("/").pop()?.split(".")[0];
  return publicID;
};
