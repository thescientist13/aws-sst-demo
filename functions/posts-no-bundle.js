import fs from 'node:fs/promises';

const productsContent = await fs.readFile(new URL('./posts.json',  import.meta.url), 'utf-8');

export const handler = async function(_event) {
  // const productsContent = await fs.readFile(new URL('./posts.json',  import.meta.url), 'utf-8');
  console.log({ productsContent });

  return {
    "body": productsContent,
    "statusCode": 200,
    "headers": {
      'Content-Type': 'application/json'
    }
  }
}