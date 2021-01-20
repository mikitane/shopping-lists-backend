import { APIGatewayProxyResult } from 'aws-lambda';

export default (statusCode: number, body: Json = ''): APIGatewayProxyResult => ({
    statusCode: statusCode,
    body: JSON.stringify(body),
})