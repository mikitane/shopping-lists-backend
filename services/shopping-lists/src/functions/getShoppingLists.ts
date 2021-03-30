import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { getShoppingListsByUserId as getShoppingListsByUserId } from '../common/db/shoppinglist';
import response from '../common/response';

export const getShoppingLists: APIGatewayProxyHandler = async (event) => {
  const userId = event.requestContext.authorizer.claims['cognito:username']
  const shoppingLists = await getShoppingListsByUserId(userId);
  return response(200, shoppingLists);
}

