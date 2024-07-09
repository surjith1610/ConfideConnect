import express from 'express';
import dotenv from 'dotenv'; // not required once hosted
import http from 'http';

import initialize from './app/app.js';
import initializeChatServer from './app/chat.js';


dotenv.config();

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3002;

initialize(app);
initializeChatServer(server);

server.listen(port, () => {console.log(`Server is running on port ${port}!`)});
