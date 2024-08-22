import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    aadharCardNumber: { type: String, required: true },
    paanCardNumber: { type: String, required: true },
    Number: { type: String, required: true },
    otp: { type: String }
});