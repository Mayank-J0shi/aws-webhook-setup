import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";


async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    let response: APIGatewayProxyResult;
    try {
        throw Error('internal server error');
    } catch(err) {
        return {
            statusCode: 400,
            body: JSON.stringify('Auth Failure')
        }
    }
    return {
        statusCode: 400,
        body: JSON.stringify('Your request lacks valid authentication credentials. Please ensure you have provided the necessary API key or token and try again. If you believe you should have access, please contact the API administrator for assistance')
    }
}

export { handler }