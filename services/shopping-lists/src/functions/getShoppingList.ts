import * as AWS from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

const dynamoDB = new AWS.DynamoDB({apiVersion: '2012-08-10'});


export const getShoppingList: APIGatewayProxyHandler = async (event) => {
  const uuid = event.pathParameters.id;

  const params = {
    TableName: process.env.MAIN_TABLE,
    Key: {
      'pk' : {S: uuid},
      'sk' : {S: uuid}
    }
  };

  try {
    const result = await dynamoDB.getItem(params).promise();
    console.log('result', result);
    return {
      statusCode: 200,
      body: JSON.stringify(result.$response.data),
    };
  } catch (e) {
    console.error(e)
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Failed to create a new shopping list'
      })
    }
  }
}

