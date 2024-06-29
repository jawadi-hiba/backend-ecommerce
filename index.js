import express from "express";
const app = express();
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.routes.js"
import authRoute from "./routes/auth.routes.js"
import bodyParser from "body-parser";

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("db connection successful!"))
    .catch((err) => {
        console.log(err);
    });

// const app = express();
app.listen(process.env.PORT || 5000, () => {
    console.log("backend server is running!");
})
app.use(bodyParser.json())
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);





