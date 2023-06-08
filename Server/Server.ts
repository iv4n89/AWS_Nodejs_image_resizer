import express, { Application } from "express";
import { Server as httpServer } from 'http';
import mongoose from "mongoose";
import * as path from 'path';
import { connectMongo } from "../Database/mongodb";
import outputRouter from '../routes/output.routes';
import tasksRouter from "../routes/tasks.routes";


/**
 * Server class to initialize express server
 */
export class Server {
    private static Instance: Server;
    private Db!: typeof import("mongoose");
    private readonly app: Application;
    private readonly port: string;
    private server!: httpServer;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || process.env.port || '3000';

        this.connectDb();

        this.middlewares();

        this.routes();

        process.on('unhandledRejection', (error) => {
            console.error('Unhandled rejection!!', error);
        });

        process.on('uncaughtException', (error) => {
            console.error('Uncaught exception!!', error);
        })
    }

    /**
     * Get a Server instance (Sigleton).
     * @returns { Server } instance
     */
    public static get instance(): Server {
        if (!this.Instance) {
            this.Instance = new Server();
        }

        return this.Instance;
    }

    /**
     * Get the mongo db connection object
     * @returns { typeof mongoose } db connection object
     */
    public get db(): typeof mongoose {
        return this.Db;
    }

    /**
     * Initialize all server middlewares
     */
    private middlewares() {
        this.app.use(express.json());
        this.app.use('/static', express.static(path.join(__dirname, '../output')));
    }

    /**
     * Set all server routes
     */
    private routes() {
        this.app.use(tasksRouter);
        this.app.use(outputRouter);
    }

    /**
     * Set up the connection to mongo db
     */
    private connectDb() {
        connectMongo().then(m => {
            this.Db = m;
            console.log('Mongo initializated');
        });
    }

    /**
     * Start the express server
     */
    public listen() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Server running in port ${this.port}`);
        });
    }

    /**
     * Close the express server
     */
    public stop() {
        this.server?.close(() => {
            console.log(`Server is getting stopped...`);
        })
    }
}