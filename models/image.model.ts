import { Schema, model } from 'mongoose';

/**
 * Image mongo db schema
 */
const ImageSchema = new Schema({
    resolution: String,
    mimeType: String,
    md5: String,
    path: String,
    timestamp: Date,
});

/**
 * Image mongo db model
 */
export const ImageModel = model('Image', ImageSchema);