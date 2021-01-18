import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

const dynamoDB = new DynamoDBClient({ apiVersion: '2012-08-10' });

const handleErrorResponse = (error: Error) => {
  console.error(error)
  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'Failed to modify shopping list'
    })
  };
};


// TODO: Use UpdateItemCommand. PutItemCommand replaces or creates a new item to Dynamo
export const updateShoppingList: APIGatewayProxyHandler = async (event) => {
  console.log(event)
  const data = JSON.parse(event.body); // TODO: Validate schema
  const userId = event.requestContext.authorizer.claims['cognito:username']
  const shoppingListId = event.pathParameters.id;

  const params = {
    TableName: process.env.MAIN_TABLE,
    Item: marshall({
      pk: `USER#${userId}`,
      sk: `SHOPPINGLIST#${shoppingListId}`,
      id: shoppingListId,
      ...data
    })
  };

  try {
    await dynamoDB.send(new PutItemCommand(params));
  } catch (e) {
    return handleErrorResponse(e);
  }

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Modified shopping list!',
      id: shoppingListId,
    }, null, 2),
  };
}
