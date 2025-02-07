export const api = new sst.aws.ApiGatewayV2("Api");

api.route("GET /api/hello", {
  handler: "functions/hello.handler",
});

api.route("GET /api/greeting", {
  handler: "functions/greeting.handler",
});

api.route("GET /api/posts", {
  handler: "functions/posts.handler",
});

api.route("GET /api/posts-no-bundle", {
  bundle: "functions",
  handler: "posts-no-bundle.handler",
});