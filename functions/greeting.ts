
import { Handler } from "aws-lambda";

export const handler: Handler  = async function(event) {
  const { rawQueryString } = event;
  const params = new URLSearchParams(rawQueryString);
  const name = params.has('name') ? params.get('name') : 'World';
  const data = { message: `Hello, ${name}!` };

  console.log({ params, name, data });

  return {
    "body": JSON.stringify(data),
    "statusCode": 200,
    "headers": {
      'Content-Type': 'application/json'
    }
  }
}