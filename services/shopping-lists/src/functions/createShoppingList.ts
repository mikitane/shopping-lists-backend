import * as AWS from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import 'source-map-support/register';

const dynamoDB = new AWS.DynamoDB({apiVersion: '2012-08-10'});


export const createShoppingList: APIGatewayProxyHandler = async () => {
  const uuid = uuidv4();

  const params = {
    TableName: process.env.MAIN_TABLE,
    Item: {
      'pk' : {S: uuid},
      'sk' : {S: uuid},
      'name': {S: 'My first shopping list'}
    }
  };

  try {
    await dynamoDB.putItem(params).promise();
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
      message: 'Created a new shopping list!'
    }, null, 2),
  };
}

