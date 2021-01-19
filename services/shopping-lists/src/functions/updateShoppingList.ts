import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { getShoppingList, putShoppingList } from '../common/db/shoppinglist';
import response from '../common/response';

// TODO: Use UpdateItemCommand
export const updateShoppingList: APIGatewayProxyHandler = async (event) => {
  const updatedShoppingList = JSON.parse(event.body); // TODO: Validate schema
  const userId = event.requestContext.authorizer.claims['cognito:username'];
  const shoppingListId = event.pathParameters.id;

  const originalShoppingList = await getShoppingList(userId, shoppingListId);

  if (!originalShoppingList) return response(404, 'Shopping list not found!');

  await putShoppingList(
    { ...originalShoppingList, ...updatedShoppingList },
    userId,
    shoppingListId
  );

  return response(200, {
    id: shoppingListId,
  });
};
