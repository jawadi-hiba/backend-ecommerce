import express from "express";
const app = express();
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.routes.js"
import authRoute from "./routes/auth.routes.js"
import bodyParser from "body-parser";
import Role from "./models/Role.js";

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


//initial() function helps us to create 3 important rows in roles collection.

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}