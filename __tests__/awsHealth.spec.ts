import axios from "axios";

const awsUrl = process.env.CLOUD_ENDPOINT;
const expectedAwsResponse = {
    statusCode: 200,
    body: "\"OK\""
};

describe('Check aws-node connection health', () => {
    it ('Should get 200 response and ok in body', async () => {
        const response = await axios.get(`${awsUrl}/health`);
        expect(response.data.statusCode).toEqual(200);

        expect(response.status).toEqual(200);
        expect(response.data).toEqual(expectedAwsResponse);
    })
})