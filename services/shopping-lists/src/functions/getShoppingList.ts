import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

// const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });


export const getShoppingList: APIGatewayProxyHandler = async (event) => {
  // console.log('event', event)

  // const uuid = event.pathParameters.id;

  // console.log('uuid', uuid)


  // const params = {
  //   TableName: process.env.MAIN_TABLE,
  //   Key: {
  //     pk: uuid,
  //     sk: uuid,
  //   }
  // };

  // try {
  //   const result = await dynamoDB.get(params).promise();
  //   console.log('Result next')
  //   console.log(result)
  //   console.log('result', result);
  //   console.log('result.ConsumedCapacity', result.ConsumedCapacity);
  //   console.log('Object.keys(result)', Object.keys(result));

  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({
  //       'result.$response.data': result.$response.data,
  //       'result': result
  //     }),
  //   };
  // } catch (e) {
  //   console.error(e)
  //   return {
  //     statusCode: 400,
  //     body: JSON.stringify({
  //       message: 'Failed to create a new shopping list!'
  //     })
  //   }
  // }

      return {
      statusCode: 200,
      body: JSON.stringify({message: "OK"}),
    };
}

