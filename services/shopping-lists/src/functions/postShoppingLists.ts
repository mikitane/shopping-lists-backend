import 'source-map-support/register';
// import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { putShoppingList as putShoppingListDB, ShoppingList } from '../common/db/shoppinglist';
import response from '../common/response';

// const sns = new SNSClient({});

export const postShoppingLists: APIGatewayProxyHandler = async (event) => {
  const shoppingListsData: ShoppingList[] = JSON.parse(event.body); // TODO: Validate schema
  const userId = event.requestContext.authorizer.claims['cognito:username']

  for (const shoppingListData of shoppingListsData) {
    await putShoppingListDB(shoppingListData, userId);
  }

  // Publish message, just for testing SNS
  // const snsParams = {
  //   Message: JSON.stringify({ id: shoppingListId }),
  //   TopicArn: process.env.ShoppingListCreatedTopicArn,
  // };

  // await sns.send(new PublishCommand(snsParams));

  return response(200);
}

