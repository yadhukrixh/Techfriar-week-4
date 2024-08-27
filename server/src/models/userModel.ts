import { Schema, model } from 'mongoose';

// Custom validator function
const requiredOrNull = (value: any) => {
  return value === null || value !== undefined && value !== '';
};

// Define the schema with custom validators
const UserSchema = new Schema({
    name: { 
        type: String, 
        validate: [requiredOrNull, 'Name is required'], 
        default: null 
    },
    email: { 
        type: String, 
        unique: true, 
        validate: [requiredOrNull, 'Email is required'], 
        default: null 
    },
    emailValidatedAt: { 
        type: Date, 
        validate: [requiredOrNull, 'Email validation date is required'], 
        default: null 
    },
    phoneNumber: { 
        type: String, 
        unique: true, 
        validate: [requiredOrNull, 'Phone number is required'], 
        default: null 
    },
    phoneNumberValidatedAt: { 
        type: Date, 
        validate: [requiredOrNull, 'Phone number validation date is required'], 
        default: null 
    },
    aadharNumber: { 
        type: String, 
        unique: true, 
        validate: [requiredOrNull, 'Aadhar number is required'], 
        default: null 
    },
    aadharValidatedAt: { 
        type: Date, 
        validate: [requiredOrNull, 'Aadhar validation date is required'], 
        default: null 
    },
    panNumber: { 
        type: String, 
        unique: true, 
        validate: [requiredOrNull, 'PAN number is required'], 
        default: null 
    },
    panValidatedAt: { 
        type: Date, 
        validate: [requiredOrNull, 'PAN validation date is required'], 
        default: null 
    },
    bankAccountNumber: { 
        type: String, 
        unique: true, 
        validate: [requiredOrNull, 'Bank account number is required'], 
        default: null 
    },
    bankAccountValidatedAt: { 
        type: Date, 
        validate: [requiredOrNull, 'Bank account validation date is required'], 
        default: null 
    },
    gstNumber: { 
        type: String, 
        unique: true, 
        validate: [requiredOrNull, 'GST number is required'], 
        default: null 
    },
    gstValidatedAt: { 
        type: Date, 
        validate: [requiredOrNull, 'GST validation date is required'], 
        default: null 
    },
    pinCode: { 
        type: String, 
        validate: [requiredOrNull, 'Pin code is required'], 
        default: null 
    },
    pinCodeValidatedAt: { 
        type: Date, 
        validate: [requiredOrNull, 'Pin code validation date is required'], 
        default: null 
    },
    city: { 
        type: String, 
        validate: [requiredOrNull, 'City is required'], 
        default: null 
    },
    district: { 
        type: String, 
        validate: [requiredOrNull, 'District is required'], 
        default: null 
    },
    state: { 
        type: String, 
        validate: [requiredOrNull, 'State is required'], 
        default: null 
    },
    dateOfBirth: { 
        type: Date, 
        validate: [requiredOrNull, 'Date of birth is required'], 
        default: null 
    },
    password: { 
        type: String, 
        validate: [requiredOrNull, 'Password is required'], 
        default: null 
    },
});

export default model('User', UserSchema);
