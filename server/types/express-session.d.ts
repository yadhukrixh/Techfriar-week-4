import session from 'express-session';
import { Session } from "express-session";


export interface SessionData extends Session {
    field:string;
    value:string;
    otp:string;
}

