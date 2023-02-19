const Gallery = require("../models/Gallery");

//?....ADD NEW IMAGE.....
const addImage = async (req, res) => {
  const { title, pic } = req.body;
  console.log({ title, pic });
  try {
    const newImage = await Gallery.create({
      pic,
      title,
    });
    res.status(201).json(newImage);
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
    const image = await Gallery.findById(imageId);
    if (image) {
      await Gallery.findByIdAndDelete(imageId);
      res.status(201).json("The image has been deleted...!");
    } else {
      res.status(401).json("the image is not find...!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { addImage, getAllImages, deleteImage };
