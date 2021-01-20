import 'source-map-support/register';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { putShoppingList } from '../common/db/shoppinglist';
import response from '../common/response';

const sns = new SNSClient({});

export const createShoppingList: APIGatewayProxyHandler = async (event) => {
  const data = JSON.parse(event.body); // TODO: Validate schema
  const userId = event.requestContext.authorizer.claims['cognito:username']

  const shoppingListId = await putShoppingList(data, userId);
  console.log('ShoppingListCreatedTopicArn', process.env.ShoppingListCreatedTopicArn)
  // Publish message to SNS
  const snsParams = {
    Message: JSON.stringify({ id: shoppingListId }),
    TopicArn: process.env.ShoppingListCreatedTopicArn,
  };

  await sns.send(new PublishCommand(snsParams));

  return response(201, {
    id: shoppingListId
  })
}

