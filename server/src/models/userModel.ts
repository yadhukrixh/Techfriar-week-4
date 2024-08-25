import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    aadharNumber: { type: String, required: true, unique: true },
    panNumber: { type: String, required: true, unique: true },
    bankAccountNumber: { type: String, required: true, unique: true },
    gstNumber: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    password: { type: String, required: true }
});

export default model('User', UserSchema);
