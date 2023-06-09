const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/.env" });

app.use(express.json());
const cors = require("cors");
app.use(cors());

// used in accesing  attached file incoming from HTTP request
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//used to provide detail information about each request(get,post) and response inHTTP and url
const morgan = require("morgan");
app.use(morgan("dev"));

//body parser sends  data in request body provide in application formta such as json
const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// used to upload file in HTTP request
// const fileUpload = require("express-fileupload");
// app.use(fileUpload());

//user API//
const userRoute = require("./routes/userRoute");
const tourRoute = require("./routes/tourRoute");
const categoryRoute = require("./routes/categoryRoute");
const BookingRoute = require("./routes/bookingRoutes");

app.use("/api/user", userRoute);
app.use("api/email", userRoute);

//Tour card API//

app.use("/api/tour", tourRoute);

//for category//
app.use("/api/category", categoryRoute);

//for bookings//

app.use("/api/Booking", BookingRoute);

module.exports = app;
