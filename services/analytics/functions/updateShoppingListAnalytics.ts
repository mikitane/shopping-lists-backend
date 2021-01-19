// import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
// import { marshall } from '@aws-sdk/util-dynamodb'
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

// const dynamoDB = new DynamoDBClient({ apiVersion: '2012-08-10' });

// const handleErrorResponse = (error: Error) => {
//   console.error(error)
//   return {
//     statusCode: 400,
//     body: JSON.stringify({
//       message: 'Failed to modify shopping list'
//     })
//   };
// };


export const updateShoppingListAnalytics: APIGatewayProxyHandler = async () => {

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Update shopping list analytics',
    }, null, 2),
  };
}
