const dotenv = require("dotenv");
dotenv.config();

const SID = process.env.SID;
const AUTH_TOKEN = process.env.T_TOKEN;
const client = require("twilio")(SID, AUTH_TOKEN);

const singleMessage = async (req, res) => {
  const { text, mobile } = req.body;
  try {
    const msgData = await client.messages.create({
      body: `${text}`,
      from: "+18647345481",
      to: `+91${mobile}`,
    });

    res.status(200).json({ "ERROR MSG": "message sent" });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { singleMessage };
