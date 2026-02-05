import express from 'express';
import '#db';
import cors from 'cors';
import { usersRouter,locationsRouter,favoriteRouter } from '#routes';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json(),cookieParser());
 

//for Users/Authentication
app.use('/auth/user', usersRouter);
//for cities and station search
app.use('/locations',locationsRouter);
//for users to manage their favorite stations
app.use('/favorites',favoriteRouter);

app.listen(port, () => console.log(`\x1b[34mMain app listening at port:${port}\x1b[0m`));
