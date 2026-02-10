import express from 'express';
import cors from 'cors';
import '#db';
import { usersRouter, locationsRouter, favoritesRouter } from '#routes';
import cookieParser from 'cookie-parser';
import { errorHandler, notFoundHandler } from '#middleware';
import { CLIENT_BASE_URL } from '#config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json(), cookieParser());
app.use(
  cors({
    origin: CLIENT_BASE_URL,
    credentials: true,
  }),
);

//for Users/Authentication
app.use('/auth/user', usersRouter);
//for cities and station search
app.use('/locations', locationsRouter);
//for users to manage their favorite stations
app.use('/favorites', favoritesRouter);
app.use('*splat', notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`\x1b[34mMain app listening at port:${PORT}\x1b[0m`));
