import { Schema, model } from 'mongoose';

// Define the simplified schema
const UserSchema = new Schema({
    name: { 
        type: String 
    },
    email: { 
        type: String, 
        unique: true
    },
    emailValidatedAt: { 
        type: Date 
    },
    phoneNumber: { 
        type: String, 
        unique: true 
    },
    phoneNumberValidatedAt: { 
        type: Date 
    },
    aadharNumber: { 
        type: String
    },
    aadharValidatedAt: { 
        type: Date 
    },
    panNumber: { 
        type: String,
        unique: true 
    },
    panValidatedAt: { 
        type: Date
    },
    bankAccountNumber: { 
        type: String, 
        unique: true
    },
    bankAccountValidatedAt: { 
        type: Date
    },
    gstNumber: { 
        type: String,
        unique: true 
    },
    gstValidatedAt: { 
        type: Date
    },
    pinCode: { 
        type: String
    },
    pinCodeValidatedAt: { 
        type: Date 
    },
    city: { 
        type: String
    },
    district: { 
        type: String 
    },
    state: { 
        type: String 
    },
    dateOfBirth: { 
        type: Date
    },
    password: { 
        type: String
    },
    UserRegisteredAt:{
        type: Date
    },
});

// Create the model using the simplified schema
export default model('User', UserSchema);
