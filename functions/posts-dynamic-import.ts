import { Handler } from "aws-lambda";

export const handler: Handler  = async function(_event) {
  // @ts-expect-error see https://github.com/jianliao/spectrum-css/issues/64
  const products = await (await import(new URL('./products-service.js', import.meta.url))).getProducts()
  console.log({ products });

  return {
    "body": JSON.stringify(products),
    "statusCode": 200,
    "headers": {
      'Content-Type': 'application/json'
    }
  }
}