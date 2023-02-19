const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "kalyanmitthu",
  api_key: "659122321462785",
  api_secret: "WccE0HTmSQRJBRXhsBdob-_IDEs",
  secure: true,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

module.exports = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
    });
  });
};
