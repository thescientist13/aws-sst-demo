import { Handler } from "aws-lambda";

export const handler: Handler  = async function(_event) {
  // @ts-expect-error see https://github.com/microsoft/TypeScript/issues/42866
  const products = await (await import(new URL('./posts-service.js', import.meta.url))).getPosts()
  console.log({ products });

  return {
    "body": JSON.stringify(products),
    "statusCode": 200,
    "headers": {
      'Content-Type': 'application/json'
    }
  }
}