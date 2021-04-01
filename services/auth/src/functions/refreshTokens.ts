import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda';
// import { CognitoIdentityProviderClient, AdminInitiateAuthCommand, AdminInitiateAuthCommandInput } from "@aws-sdk/client-cognito-identity-provider";


// const cognitoClient = new CognitoIdentityProviderClient({});

export const refreshTokens: APIGatewayProxyHandler = async () => {

  // const input =

  // const command = AdminInitiateAuthCommand({
  //   ClientId: '2bl2qv4glv4vdonkles1o7agpo'
  // });

  return {
    statusCode: 200,
    body: 'OK',
  };
}

