import 'source-map-support/register';

// TODO: Update analytics to DynamoDB etc.
// Current implementation is just for testing SNS and SQS
export const updateShoppingListAnalytics = async (event) => {

  event.Records.forEach(record => {
    const data = JSON.parse(record.body);
    console.log(`New shopping list created with id: ${data.id}`)
  });

  return {};
}
