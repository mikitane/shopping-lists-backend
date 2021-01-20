// import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
// import { marshall } from '@aws-sdk/util-dynamodb'
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

// const dynamoDB = new DynamoDBClient({ apiVersion: '2012-08-10' });

export const updateShoppingListAnalytics: APIGatewayProxyHandler = async (event) => {
  console.log(event)
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Update shopping list analytics',
    }, null, 2),
  };
}
