import express from 'express';
import cors from 'cors';
import '#db';
import { usersRouter, locationsRouter, favoritesRouter } from '#routes';
import { CLIENT_BASE_URL } from '#config';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

app.listen(port, () => console.log(`\x1b[34mMain app listening at port:${port}\x1b[0m`));
