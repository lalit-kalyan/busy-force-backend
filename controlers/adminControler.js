const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const cloudinary = require("cloudinary").v2;

//*register COntrollers....................................................
const registerAdmin = async (req, res) => {
  const { username, email, phone, pic } = req.body;

  try {
    if (!username || !email || !phone) {
      return res
        .status(401)
        .json(
          " Error : username , email and mobile no.  must be required to register"
        );
    }

    const adminwithEmail = await Admin.findOne({ email });
    if (adminwithEmail) {
      return res
        .status(401)
        .json(`Error message: this  already exist : EMAIL ....!`);
    }

    const adminwithPhone = await Admin.findOne({ phone });
    if (adminwithPhone) {
      return res
        .status(401)
        .json(`Error message: this  already exist : PHONE ....!`);
    }

    const admin = await Admin.create({
      username,
      email,
      phone,
      pic,
    });
    if (admin) {
      res.status(201).json({
        id: admin._id,
        username: admin.username,
        email: admin.email,
        pic: admin.pic,
        isAdmin: admin.isAdmin,
      });
    }
  } catch (error) {
    res.status(401).json({ "ERROR MSG": error });
  }
};

//!..........LOGIN.....................................................
const adminLogin = async (req, res) => {
  const { email, phone } = req.body;
  console.log({ email, phone });
  try {
    if (!email || !phone) {
      return res
        .status(401)
        .json(" Error : email and mobile no.  must be required to Login");
    }

    const user = await Admin.findOne({ email });
    console.log(user);

    //!JWT  ACCESS-TOKEN GENERATING......................
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );
    //!JWT  ACCESSTAKEN GENERATING END...................
    console.log(accessToken);

    if (user) {
      if (user.phone === +phone) {
        res.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          pic: user.pic,
          token: accessToken,
        });
      } else {
        res.status(401).json("Invalid  phone");
      }
    } else {
      res.status(401).json("Invalid Email ");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

//!.................EDIT USER...................................
const editAdmin = async (req, res) => {
  const { userId } = req.params;

  const { username, email, phone, isAdmin } = req.body;
  if (!username && !email && !phone && !isAdmin) {
    return res
      .status(401)
      .json(" At least one field is required to updated Admin...!");
  }

  const getUser = {
    getUsername: "",
    getEmail: "",
    getIsAdmin: "",
    getPhone: "",
  };

  try {
    const user = await Admin.findById(userId);

    if (!username) {
      getUser.getUsername = user.username;
    } else {
      getUser.getUsername = username;
    }
    if (!email) {
      getUser.getEmail = user.email;
    } else {
      getUser.getEmail = email;
    }
    if (!isAdmin) {
      getUser.getIsAdmin = user.isAdmin;
    } else {
      getUser.getIsAdmin = isAdmin;
    }
    if (!phone) {
      getUser.getPhone = user.phone;
    } else {
      getUser.getPhone = phone;
    }
    // console.log(" db USER.......>>", user);
    // console.log("get USER.......>>", getUser);
    const file = req.files.photo;
    const result = await cloudinary.uploader.upload(
      file.tempFilePath,
      (err, result) => {
        if (err) {
          return res.status(401).json(err);
        }
        return result;
      }
    );

    const updateAdmin = await Admin.findByIdAndUpdate(
      userId,
      {
        username: getUser.getUsername,
        email: getUser.getEmail,
        pic: result.url,
        isAdmin: getUser.getIsAdmin,
        phone: getUser.getPhone,
      },
      {
        new: true,
      }
    );

    res.status(200).json(" User has been updated......! ");
  } catch (error) {
    res.status(401).json(error);
  }
};

//?...........DELETE ADMIN...............................
const deleteAdmin = async (req, res) => {
  const { userId } = req.params;
  try {
    if (userId) {
      const user = await Admin.findById(userId);
      console.log(user);
      if (user) {
        await Admin.findByIdAndDelete(userId);
        res.status(200).json("user has been deleted..........!");
      } else {
        res.status(401).json(" user  did not finde.......!");
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//?...........GET ADMIN...............................
const getAdmin = async (req, res) => {
  const { userId } = req.params;
  try {
    if (userId) {
      const user = await Admin.findById(userId);
      res.status(401).json(user);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  registerAdmin,
  adminLogin,
  editAdmin,
  deleteAdmin,
  getAdmin,
};


//https://res.cloudinary.com/kalyanmitthu
//https://api.cloudinary.com/v1_1/kalyanmitthu
//https://res.cloudinary.com/kalyanmitthu/image/upload/v1676302267/z3y1yrkfp9gygnznthhc.jpg
