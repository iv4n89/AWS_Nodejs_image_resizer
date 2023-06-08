import { createHash } from 'crypto';
import path from 'path';

export const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

export const toMD5 = (fileBinary: string) => createHash('md5').update(Buffer.from(fileBinary)).digest('hex');

export const getResizedPath = (resizedBitmap: string, filename: string, extension: string, size: '800' | '1024') => {

    const dir = path.join(__dirname, '../output', filename, size);
    const md5 = toMD5(resizedBitmap);
    const fullDir = `${dir}/${md5}.${extension}`;
    const shortDir = `${filename}/${size}/${md5}.${extension}`;

    return {
        fullDir,
        dirNoFile: dir,
        shortDir,
        md5
    }
}