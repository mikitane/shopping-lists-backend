import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

const dynamoDB = new DynamoDB({ apiVersion: '2012-08-10' });

const handleErrorResponse = (error: Error) => {
  console.error(error)
  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'Failed to retrieve the shopping list'
    })
  };
};

export const getShoppingList: APIGatewayProxyHandler = async (event) => {
  const userId = 'UNKNOWN' // TODO: Authorize user and get id
  const shoppingListId = event.pathParameters.id;

  const params = {
    TableName: process.env.MAIN_TABLE,
    Key: marshall({
      pk: `USER#${userId}`,
      sk: `SHOPPINGLIST#${shoppingListId}`,
    })
  };

  let shoppingList = null;
  try {
    const { Item } = await dynamoDB.getItem(params);
    shoppingList = unmarshall(Item);
  } catch (e) {
    return handleErrorResponse(e);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(shoppingList),
  };
}

