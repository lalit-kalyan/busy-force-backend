const Gallery = require("../models/Gallery");
const { deleteCloudeImage } = require("../cinfig/cloudeImgDlt");

//?....ADD NEW IMAGE.....
const addImage = async (req, res) => {
  const { title } = req.body;
  //console.log("FILE DATA", req.file);
  const { secure_url, public_id } = req.file;

  try {
    const newImage = await Gallery.create({
      pic: secure_url,
      title,
      publicId: public_id,
    });
    res.status(201).json(" image uploaded");
  } catch (error) {
    res.status(500).json(error);
  }
};

//?.....GET ALL IMAGE....
const getAllImages = async (req, res) => {
  try {
    const allImage = await Gallery.find();
    res.status(201).json(allImage);
  } catch (error) {
    res.status(500).json(error);
  }
};
//?....DELETE IMAGE....
const deleteImage = async (req, res) => {
  const { imageId } = req.params;

  try {
    const image = await Gallery.findOne({ publicId: imageId });
    if (image) {
      await Gallery.findOneAndDelete({ publicId: imageId });
      deleteCloudeImage(imageId);
      res.status(201).json("The image has been deleted...!");
    } else {
      res.status(401).json("the image is not find...!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { addImage, getAllImages, deleteImage };
