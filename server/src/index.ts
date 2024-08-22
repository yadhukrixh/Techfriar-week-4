import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import connectToDatabase from './database';

dotenv.config();// import env variables
const app = express();
const port =  process.env.PORT;



app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running`);
    connectToDatabase();
});
