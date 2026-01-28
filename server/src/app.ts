import express from 'express';
import '#db';
import cors from 'cors';
import { usersRouter } from '#routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth/user', usersRouter);

app.listen(port, () => console.log(`\x1b[34mMain app listening at port:${port}\x1b[0m`));
