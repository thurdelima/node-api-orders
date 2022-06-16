import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import routes from './routes'

import './database';

const app = express();


app.use(cors());
app.use(express.json());
app.use(routes);


http.createServer(app).listen(3333, () => {
    console.log('server listen at 3333');
})