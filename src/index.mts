import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import * as anki from './anki.js';

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    let url : URL;
    try {
        url = new URL(event.queryStringParameters?.url);
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Invalid or missing parameter: 'url'.",
            }),
        };
    }

    let buffer = await anki.fromUrl(url);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'hello world:' + url.toString(),
        }),
    };
};