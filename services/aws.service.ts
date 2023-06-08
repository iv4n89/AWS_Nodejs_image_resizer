import axios, { AxiosResponse } from "axios";

interface AwsResponse {
    statusCode: number;
    body: {
        resizedImage1024: string;
        resizedImage800: string;
    };
    headers: {
        [x: string]: string;
    }
}

/**
 * Send a request to aws service with the bitmap of the image to resize and get the image back resized
 * @param { string } bitmap
 * @returns { Promise<AxiosResponse<AwsResponse, any>> } Response from aws
 */
const resizeImage = async (bitmap: string): Promise<AxiosResponse<AwsResponse, any>> => await axios.post<AwsResponse>(process.env.CLOUD_ENDPOINT!, {
    data: bitmap
});

export const awsService = {
    resizeImage
};