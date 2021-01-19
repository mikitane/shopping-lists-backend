import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { putShoppingList } from '../common/db/shoppinglist';
import response from '../common/response';

export const createShoppingList: APIGatewayProxyHandler = async (event) => {
  const data = JSON.parse(event.body); // TODO: Validate schema
  const userId = event.requestContext.authorizer.claims['cognito:username']

  const shoppingListId = await putShoppingList(data, userId);

  return response(201, {
    id: shoppingListId
  })
}

