import session from 'express-session';
import { Session } from "express-session";


export interface SessionData extends Session {
    [key: string]: any;
    email:string;
    otp:string;
    userId:string;
}

