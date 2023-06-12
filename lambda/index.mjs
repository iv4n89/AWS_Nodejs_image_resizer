import sharp from "sharp";

export const handler = async (event, context) => {

    try {

        const imageBuffer = Buffer.from(event.data, 'base64');

        const resizedImage1024 = await sharp(imageBuffer).resize(1024).toBuffer();
        const resizedImage800 = await sharp(imageBuffer).resize(800).toBuffer();

        return {
            statusCode: 200,
            body: {
                resizedImage1024: resizedImage1024.toString('base64'),
                resizedImage800: resizedImage800.toString('base64'),
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (err) {
        console.error('Error al procesar la imagen', err);
        return {
            statusCode: 400,
            body: {
                message: 'Error al procesar la imagen',
                error: err.message
            }
        }
    }
};
