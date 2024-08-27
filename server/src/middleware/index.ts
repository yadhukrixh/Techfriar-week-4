import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const middleware = (app: express.Express) => {
    // Middleware to parse JSON bodies
    app.use(express.json());

    // Session middleware
    app.use(session({
        secret: process.env.SESSION_SECRET, // Use a strong secret
        resave: false,
        saveUninitialized: true,
        cookie: { secure: process.env.NODE_ENV === 'production' } // Set secure cookies in production
    }));
};

export default middleware;
