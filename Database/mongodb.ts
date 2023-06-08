import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const mongo_user = process.env.MONGO_USER ?? '';
const mongo_password = process.env.MONGO_PASSWORD ?? '';
const mongo_host = process.env.MONGO_HOST ?? '';

const mongoDb = `mongodb://${mongo_user}:${mongo_password}@${mongo_host}`;

/**
 * Connect to mongo db
 * @returns { Promise<typeof mongoose> } Mongo db connection object
 */
export const connectMongo = async (): Promise<typeof mongoose> => await mongoose.connect(mongoDb);