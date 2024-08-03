import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //Image Upload on Cloudinary
    const uploadResult = await cloudinary.uploader
      .upload(localFilePath, {
        resource_type: "auto",
      })
      .catch((error) => {
        console.log(`Error in cloudinary configuration ${error}`);
      });

    console.log(`File is uploaded on cloudinary ${uploadResult}`);
    return uploadResult
  } catch (e) {
    console.log(`Error in file uploding on cloudinary ===>> ${e}`);
    fs.unlinkSync(localFilePath)
    return null
  }
};

export {uploadCloudinary}
