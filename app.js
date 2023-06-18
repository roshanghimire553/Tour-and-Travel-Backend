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
app.use(bodyParser.json());

//user API//
const userRoute = require("./routes/userRoute");
const tourRoute = require("./routes/tourRoute");
const categoryRoute = require("./routes/categoryRoute");
const BookingRoute = require("./routes/bookingRoutes");
const ReviewRoute = require("./routes/ratingRoute");
const dayRoute = require("./routes/daysRoute");
const contactRoute = require("./routes/contactUsRoutes");

app.use("/api/user", userRoute);
app.use("api/email", userRoute);

//Tour card API//

app.use("/api/tour", tourRoute);

//for category//
app.use("/api/category", categoryRoute);

//for bookings//

app.use("/api/Booking", BookingRoute);

//for reviews //

app.use("/api/Review", ReviewRoute);

//for days//
app.use("/api/Days", dayRoute);

//for contactUs route//

app.use("/api/ContactUs", contactRoute);

module.exports = app;
