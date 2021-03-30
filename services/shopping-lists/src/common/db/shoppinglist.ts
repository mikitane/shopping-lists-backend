import { PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import dynamoDB from './index';
import { Product } from './product';

type ShoppingList = {
  pk: string,
  sk: string,
  id: string,
  name: string | null,
  products: Product[]
}

type InternalShoppingList = ShoppingList & {
  pk: string,
  sk: string,
}

// type NullableShoppingList = ShoppingList | null;
// type NullableInternalShoppingList = InternalShoppingList | null;

export const getShoppingListsByUserId = async (userId: string): Promise<ShoppingList[]> => {
  const params = {
    TableName: process.env.MAIN_TABLE,
    KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
    ExpressionAttributeValues: marshall({
      ':pk': `USER#${userId}`,
      ':sk': 'SHOPPINGLIST#'
    }),
  };

  const { Items } = await dynamoDB.send(new QueryCommand(params));

  if (!Items) return [];

  const shoppingLists = Items.map(item => {
    const shoppingList = unmarshall(item) as InternalShoppingList
    delete shoppingList.pk;
    delete shoppingList.sk;
    return shoppingList as ShoppingList;
  });

  return shoppingLists;
};


export const putShoppingList = async (data: Record<string, unknown>, userId: string): Promise<string> => {
  const shoppingListId = data.id;

  if (typeof shoppingListId !== 'string' || !shoppingListId) {
    throw Error('putShoppingList: No id found shoppingList data');
  }

  const params = {
    TableName: process.env.MAIN_TABLE,
    Item: marshall({
      pk: `USER#${userId}`,
      sk: `SHOPPINGLIST#${shoppingListId}`,
      ...data
    })
  };

  await dynamoDB.send(new PutItemCommand(params));

  return shoppingListId;
};