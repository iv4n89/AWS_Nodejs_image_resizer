import * as dotenv from 'dotenv';
dotenv.config();

import { Server } from './Server/Server';

const server = Server.instance;

server.listen();