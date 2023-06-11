import { createHash } from 'crypto';
import path from 'path';

/**
 * Parse a file to base64
 * @param {File} file 
 * @returns { Promise<string> } 
 */
export const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

/**
 * Generates a MD5 from a file binary string
 * @param { string } fileBinary 
 * @returns { string } The generated MD5
 */
export const toMD5 = (fileBinary: string) => createHash('md5').update(Buffer.from(fileBinary)).digest('hex');

/**
 * Get a set of paths with the resized images ready to use
 * @param { string } resizedBitmap 
 * @param { string }filename 
 * @param { string } extension 
 * @param { '800' | '1024' } size 
 * @returns { { fullDir: string, dirNoFile: string, shorDir: string, md5: string } }
 */
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