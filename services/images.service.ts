import * as fs from 'fs';
import { ImageModel } from "../models/image.model";
import { getResizedPath, toMD5 } from "../util/imageUtil";

/**
 * 
 * @param { string } bitmap 
 * @param { string | number } size 800 | 1024 | The original image width 
 * @param { string } mimetype 
 * @param path 
 * @returns 
 */
const createImage = async (
    bitmap: string,
    size: string | number,
    mimetype: string,
    path?: {
        filename: string;
        extension: string;
    }) => {
        let dir = undefined;
        let md5 = undefined;
        if (path) {
            dir = getResizedPath(bitmap, path.filename, path.extension, size as any);
            if (!fs.existsSync(dir.dirNoFile)) {
                fs.mkdirSync(dir.dirNoFile, { recursive: true });
            }
            fs.writeFileSync(dir.fullDir, bitmap, { encoding: 'base64' });
            md5 = dir.md5;
        } else {
            md5 = toMD5(bitmap);
        }
        const image = new ImageModel({
            md5,
            resolution: size,
            mimeType: mimetype,
            ...(!!dir && { path: dir.shortDir }),
            timestamp: new Date()
        });
        return image.save();
}

export const imagesService = {
    createImage,
}