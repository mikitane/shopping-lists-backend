import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { getShoppingList as getShoppingListDB } from '../common/db/shoppinglist';
import response from '../common/response';

export const getShoppingList: APIGatewayProxyHandler = async (event) => {
  const userId = event.requestContext.authorizer.claims['cognito:username']
  const shoppingListId = event.pathParameters.id;

  const shoppingList = await getShoppingListDB(userId, shoppingListId);

  if (!shoppingList) return response(404, 'Shopping list not found!')

  return response(200, shoppingList);
}

