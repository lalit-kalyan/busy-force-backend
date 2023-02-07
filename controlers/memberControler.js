const Member = require("../models/Member");
const cloudinary = require("cloudinary").v2;

//*register MEMBER....................................................
const registerMember = async (req, res) => {
  const { username, email, phone, pic, joining, isActiveMember, plan } =
    req.body;
  console.log({
    username,
    email,
    phone,
    pic,
    joining,
    plan,
  });

  try {
    if (!username || !email || !phone || !joining) {
      return res
        .status(401)
        .json(
          " Error : username ,joining  date ,  email and mobile no.  must be required to register"
        );
    }

    const memberwithEmail = await Member.findOne({ email });
    if (memberwithEmail) {
      return res
        .status(401)
        .json(`Error message: this  already exist : EMAIL ....!`);
    }

    const memberwithPhone = await Member.findOne({ phone });
    if (memberwithPhone) {
      return res
        .status(401)
        .json(`Error message: this  already exist : PHONE ....!`);
    }

    const member = await Member.create({
      username,
      email,
      phone,
      pic,
      joining,
      lastActive: joining,
      isActiveMember,
      plan,
    });
    if (member) {
      res.status(201).json(member);
    }
  } catch (error) {
    res.status(401).json({ "ERROR MSG": error });
  }
};

//!..........LOGIN.....................................................
const memberLogin = async (req, res) => {
  const { email, phone } = req.body;
  //console.log(req.body);

  try {
    if (!email || !phone) {
      return res
        .status(401)
        .json(" Error : email and mobile no.  must be required to Login");
    }

    const user = await Member.findOne({ email });

    if (user) {
      if (user.phone === phone) {
        res.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          lastActive: user.lastActive,
          pic: user.pic,
          joining: user.joining,
          lastActive: user.lastActive,
          plan: user.plan,
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
const editMember = async (req, res) => {
  const { userId } = req.params;

  const { username, email, phone, pic, isActiveMember, joining, lastActive } =
    req.body;
  if (!username && !email && !phone && !pic) {
    return res
      .status(401)
      .json(" At least one field is required to updated Member...!");
  }

  const getUser = {
    getUsername: "",
    getEmail: "",
    getPic: "",
    getisActiveMember: "",
    getPhone: "",
    getJoining: "",
    getLastActive: "",
  };

  try {
    const user = await Member.findById(userId);

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
    if (!pic) {
      getUser.getPic = user.pic;
    } else {
      getUser.getPic = pic;
    }
    if (!isActiveMember) {
      getUser.getisActiveMember = user.isActiveMember;
    } else {
      getUser.getisActiveMember = isActiveMember;
    }
    if (!phone) {
      getUser.getPhone = user.phone;
    } else {
      getUser.getPhone = phone;
    }
    if (!joining) {
      getUser.getJoining = user.joining;
    } else {
      getUser.getJoining = joining;
    }
    if (!lastActive) {
      getUser.getLastActive = user.lastActive;
    } else {
      getUser.getLastActive = lastActive;
    }

    const updatedMember = await Member.findByIdAndUpdate(
      userId,
      {
        username: getUser.getUsername,
        email: getUser.getEmail,
        pic: getUser.getPic,
        isActiveMember: getUser.getisActiveMember,
        phone: getUser.getPhone,
        joining: getUser.getJoining,
        lastActive: getUser.getLastActive,
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

//?...........DELETE MEMBER...............................
const deleteMember = async (req, res) => {
  const { userId } = req.params;
  try {
    if (userId) {
      const user = await Member.findById(userId);
      console.log(user);
      if (user) {
        await Member.findByIdAndDelete(userId);
        res.status(200).json("user has been deleted..........!");
      } else {
        res.status(401).json(" user  did not find.......!");
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//?...........GET MEMBER...............................
const getMember = async (req, res) => {
  const { userId } = req.params;
  try {
    if (userId) {
      const user = await Member.findById(userId);
      res.status(401).json(user);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//?...........GET ALL MEMBER...............................
const getAllMember = async (req, res) => {
  try {
    const user = await Member.find();
    res.status(401).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//?..........GET NUMBERS OF MEMBER MONTH WISE.........
const getmemberByMonth = async (req, res) => {};

module.exports = {
  registerMember,
  memberLogin,
  editMember,
  getAllMember,
  getMember,
  deleteMember,
};
