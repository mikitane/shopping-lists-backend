import { GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import dynamoDB from './index';
import { Product } from './product';

type ShoppingList = {
  pk: string,
  sk: string,
  id: string,
  name: string | null,
  products: Product[]
}

type NullableShoppingList = ShoppingList | null;


export const getShoppingList = async (userId: string, shoppingListId: string): Promise<NullableShoppingList> => {
  const params = {
    TableName: process.env.MAIN_TABLE,
    Key: marshall({
      pk: `USER#${userId}`,
      sk: `SHOPPINGLIST#${shoppingListId}`,
    })
  };

  const { Item } = await dynamoDB.send(new GetItemCommand(params));

  return Item ? unmarshall(Item) as ShoppingList : null;
};


export const putShoppingList = async (data: Record<string, unknown>, userId: string, shoppingListId = uuidv4()): Promise<string> => {
  const params = {
    TableName: process.env.MAIN_TABLE,
    Item: marshall({
      pk: `USER#${userId}`,
      sk: `SHOPPINGLIST#${shoppingListId}`,
      id: shoppingListId,
      ...data
    })
  };

  await dynamoDB.send(new PutItemCommand(params));

  return shoppingListId;
};