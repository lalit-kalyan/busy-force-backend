const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const verfyAdmin = async (req, res, next) => {
  let token;
  const headerToken = req.headers.token;

  try {
    if (headerToken) {
      token = headerToken.split(" ")[1];
      //console.log("this is token", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      //console.log("decoded data>>>>", decoded);

      const user = await Admin.findById(decoded.id);
      //console.log("USER-->", user);

      if (user.isAdmin === true) {
        next();
      } else {
        return res
          .status(401)
          .json("only Admin can perform this operation........!");
      }
    } else {
      return res.status(401).json("You are not authenticated........!");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  verfyAdmin,
};
