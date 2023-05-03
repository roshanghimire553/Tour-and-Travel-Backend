const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/.env" });

app.use(express.json());

// used in accesing  attached file incoming from HTTP request
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//used to provide detail information about each request(get,post) and response inHTTP and url
const morgan = require("morgan");
app.use(morgan("dev"));

//body parser sends  data in request body provide in application formta such as json
const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
// used to upload file in HTTP request
const fileUpload = require("express-fileupload");
app.use(fileUpload());

const userRoute = require("./routes/userRoute");

app.use("/api/user", userRoute);
app.use("api/email", userRoute);

module.exports = app;