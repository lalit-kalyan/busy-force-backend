const express = require("express");
const dotenv = require("dotenv");
const app = express();
const colors = require("colors");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const connectDB = require("./cinfig/db");
const adminRoute = require("./routers/adminRoute");
const memberRoute = require("./routers/memberRouter");
const galleryRoute = require("./routers/galleryRoute");
const fileUpload = require("express-fileupload");
const treasuryRoute = require("./routers/treasuryRoute");

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//ROUTER.............
app.use("/api/admin", adminRoute);
app.use("/api/members", memberRoute);
app.use("/api/gallery", galleryRoute);
app.use("/api/treasury", treasuryRoute);

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`.cyan.bold.underline);
});
