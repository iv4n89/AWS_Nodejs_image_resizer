import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import * as fs from 'fs';
import * as path from 'path';
import { ImageModel } from "../models/image.model";
import { TaskModel } from "../models/tasks.model";

/**
 * Get an image from static folder by task id
 * @param { Request } req
 * @param { Response } res 
 * @returns { Promise<void> } void
 */
const getImage = async ({ params: { taskId, size } }: Request<{ taskId: string; size: string; }>, res: Response): Promise<void> => {
    const task = await TaskModel.findById(taskId);
    const imageId = task?.images?.[size as '800' | '1024'];
    const image = await ImageModel.findById(imageId);
    if (!image?.path) {
        throw new Error('No path was recorded for this image!');
    }
    const filePath = path.join(__dirname, '../output', image?.path);
    fs.readFile(filePath, (error, data) => {
        if (error) return;

        res.writeHead(HttpStatusCode.Ok, { 'Content-Type': image.mimeType });
        res.end(data, 'utf-8');
    });
}

export const outputController = {
    getImage
}