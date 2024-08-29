import { Schema, model } from 'mongoose';

// Define the simplified schema
const UserSchema = new Schema({
    name: { 
        type: String,
        default:null
    },
    email: { 
        type: String, 
        unique: true,
        default:null
    },
    emailValidatedAt: { 
        type: Date,
        default:null
    },
    phoneNumber: { 
        type: String, 
        unique: true ,
        default:null
    },
    phoneNumberValidatedAt: { 
        type: Date,
        default:null
    },
    aadharNumber: { 
        type: String,
        default:null
    },
    aadharValidatedAt: { 
        type: Date,
        default:null
    },
    panNumber: { 
        type: String,
        default:null
    },
    panValidatedAt: { 
        type: Date,
        default:null
    },
    bankAccountNumber: { 
        type: String,
        default:null
    },
    bankAccountValidatedAt: { 
        type: Date,
        default:null
    },
    ifscCode: {
        type:String,
        default:null
    },
    gstNumber: { 
        type: String,
        default:null
    },
    gstValidatedAt: { 
        type: Date,
        default:null
    },
    pinCode: { 
        type: String,
        default:null
    },
    pinCodeValidatedAt: { 
        type: Date,
        default:null
    },
    city: { 
        type: String,
        default:null
    },
    district: { 
        type: String,
        default:null
    },
    state: { 
        type: String,
        default:null
    },
    dateOfBirth: { 
        type: Date,
        default:null
    },
    password: { 
        type: String,
        default:null
    },
    UserRegisteredAt:{
        type: Date,
        default:null
    },
});

// Create the model using the simplified schema
export default model('User', UserSchema);
