const Member = require("../models/Member");
const { deleteCloudeImage } = require("../cinfig/cloudeImgDlt");

//*register MEMBER....................................................
const registerMember = async (req, res) => {
  console.log(req.body);
  const { username, email, phone, joining, plan, planId, address } = req.body;
  

  try {
    if (
      !username ||
      !email ||
      !phone ||
      !joining ||
      !planId ||
      !plan ||
      !address
    ) {
      return res
        .status(401)
        .json(
          " Error : username , planId , joining  date ,  email and mobile no.  must be required to register"
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

    let getDate = new Date(joining);

    let monthCode = `${getDate.getFullYear()}${getDate.getMonth() + 1}`;
    console.log({ getDate, monthCode });

    const newMember = new Member({
      username,
      email,
      address,
      phone,
      joining,
      lastActive: joining,
      monthCode,
      plan,
      planId,
    });
    const savedMember = await newMember.save();

    res.status(201).json(savedMember);
  } catch (error) {
    res.status(500).json(error);
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

//?.................EDIT USER...................................
const editMember = async (req, res) => {
  const { userId } = req.params;

  const {
    username,
    email,
    phone,
    isActive,
    joining,
    lastActive,
    plan,
    planId,
  } = req.body;

  let monthCode;
  let getMonth;

  if (!username && !email && !phone && !planId && !isActive && !plan) {
    return res
      .status(401)
      .json(" At least one field is required to updated Member...!");
  }

  const getUser = {
    getUsername: "",
    getEmail: "",
    getisActive: "",
    getPhone: "",
    getJoining: "",
    getLastActive: "",
    getPlan: "",
    getPlanId: "",
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
    if (!phone) {
      getUser.getPhone = user.phone;
    } else {
      getUser.getPhone = phone;
    }
    if (isActive == "null") {
      getUser.getisActive = user.isActive;
    } else {
      getUser.getisActive = isActive;
    }
    if (!joining) {
      getUser.getJoining = user.joining;
    } else {
      getUser.joining = joining;
    }
    if (!lastActive) {
      getUser.getLastActive = user.lastActive;
    } else {
      getUser.getLastActive = lastActive;
    }
    if (!plan) {
      getUser.getPlan = user.plan;
    } else {
      getUser.getPlan = plan;
    }
    if (!planId) {
      getUser.getPlanId = user.planId;
    } else {
      getUser.getPlanId = planId;
    }
    if (!lastActive) {
      getMonth = new Date(user.lastActive);
      monthCode = user.monthCode;
    } else {
      getMonth = new Date(getUser.getLastActive);
      monthCode = `${getMonth.getFullYear()}${getMonth.getMonth() + 1}`;
    }

    //console.log("GET-USER--->", getUser);

    getUser.getMonthCode = monthCode;

    await Member.findByIdAndUpdate(userId, {
      username: getUser.getUsername,
      email: getUser.getEmail,
      phone: getUser.getPhone,
      isActive: getUser.getisActive,
      joining: getUser.getJoining,
      monthCode: getUser.getMonthCode,
      lastActive: getUser.getLastActive,
      plan: getUser.getPlan,
      planId: getUser.getPlanId,
    });

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
      //console.log(user);
      if (user) {
        await Member.findByIdAndDelete(userId);
        deleteCloudeImage(user.picId);
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
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//?...........GET ALL MEMBER...............................
const getAllMember = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    //console.log(keyword);

    const user = await Member.find(keyword);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//?...........SEARCH MEMBER................................

module.exports = {
  registerMember,
  memberLogin,
  editMember,
  getAllMember,
  getMember,
  deleteMember,
};
