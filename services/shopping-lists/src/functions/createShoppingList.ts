import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import 'source-map-support/register';

const dynamoDB = new DynamoDB({ apiVersion: '2012-08-10' });

export const createShoppingList: APIGatewayProxyHandler = async (event) => {
  const data = JSON.parse(event.body);
  const userId = 'UNKNOWN' // TODO: Authorize user and get id
  const shoppingListId = uuidv4();

  const params = {
    TableName: process.env.MAIN_TABLE,
    Item: marshall({
      pk: `USER#${userId}`,
      sk: `SHOPPINGLIST#${shoppingListId}`,
      ...data
    })
  };

  try {
    await dynamoDB.putItem(params);
  } catch (e) {
    console.error(e)
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Failed to create a new shopping list'
      })
    }
  }

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Created a new shopping list!',
      id: shoppingListId,
    }, null, 2),
  };
}

