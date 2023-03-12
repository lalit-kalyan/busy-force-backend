const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
  secure: true,
});

const deleteCloudeImage = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
    console.log("file has been deleted....!");
  } catch (error) {}
};

module.exports = { deleteCloudeImage };
