import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export default new DynamoDBClient({ apiVersion: '2012-08-10' });

