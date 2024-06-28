import mongoose from "mongoose";

const Role = mongoose.model(
    "role",
    new mongoose.Schema({
        name: String
    })
);
export default Role;