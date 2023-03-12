const express = require("express");
const dotenv = require("dotenv");
const app = express();
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./cinfig/db");
const adminRoute = require("./routers/adminRoute");
const memberRoute = require("./routers/memberRouter");
const galleryRoute = require("./routers/galleryRoute");
const treasuryRoute = require("./routers/treasuryRoute");
const messageRoute = require("./routers/messageRouter");
const multer = require("multer");

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

//ROUTER.............
app.use("/api/admin", adminRoute);
app.use("/api/members", memberRoute);
app.use("/api/gallery", galleryRoute);
app.use("/api/treasury", treasuryRoute);
app.use("/api/message", messageRoute);

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`.cyan.bold.underline);
});
