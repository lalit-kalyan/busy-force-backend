const Member = require("../models/Member");
const dotenv = require("dotenv");
dotenv.config();

const SID = process.env.SID;
const AUTH_TOKEN = process.env.T_TOKEN;
// console.log("SID:", SID);
// console.log("TOKEN :", AUTH_TOKEN);
const client = require("twilio")(SID, AUTH_TOKEN);

const singleMessage = async (req, res) => {
  const { text, mobile } = req.body;

  try {
    // const msgData = await client.messages.create({
    //   body: "your membership plan has EXPIRED..... please pay your FEES.....if you piad already then ask for activation...__BUSY_FORCE.com",
    //   from: "+18647345481",
    //   to: "+917206169603",
    // });

    res.status(200).json("messagesent");
  } catch (error) {
    res.status(401).json(error);
  }
};

const bulkMsg = async (req, res) => {
  const { text } = req.body;
  if (text) {
    try {
      // const membersList = await Member.find({}, { phone: 1 });

      // for (let m = 0; m <= membersList.length; m++) {
      //   if (membersList[m]) {
      //     try {
      //       await client.messages.create({
      //         body: `${text}`,
      //         from: "+18647345481",
      //         to: `+91${membersList[m].phone}`,
      //       });
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   }
      // }
      res.status(200).json("msg sent to all");
    } catch (error) {
      res.status(401).json(error);
    }
  } else {
  }
};

module.exports = { singleMessage, bulkMsg };

// to: `+91${mobile}`,
