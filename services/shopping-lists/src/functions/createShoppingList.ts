import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const createShoppingList: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Created a new shopping list!'
    }, null, 2),
  };
}

