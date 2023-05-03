const app = require("./app");
const connectDB = require("./config/databaseConfig");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`server started at port ${process.env.PORT}`);
});
