import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import 'source-map-support/register';

const dynamoDB = new DynamoDBClient({ apiVersion: '2012-08-10' });

const handleErrorResponse = (error: Error) => {
  console.error(error)
  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'Failed to create a new shopping list'
    })
  };
};

export const createShoppingList: APIGatewayProxyHandler = async (event) => {
  console.log(event)
  const data = JSON.parse(event.body); // TODO: Validate schema
  const userId = event.requestContext.authorizer.claims['cognito:username']
  const shoppingListId = uuidv4();

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
      message: 'Created a new shopping list!',
      id: shoppingListId,
    }, null, 2),
  };
}

