const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
  secure: true,
});

const imageUploader = async (req, res, next) => {
  const { path } = req.file;

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(path, options);
      //console.log("from RESULT----->", result);
      req.file = result;
      next();
    } catch (error) {
      console.log(error);
    }
  } else {
    next();
  }
};

module.exports = { imageUploader };
