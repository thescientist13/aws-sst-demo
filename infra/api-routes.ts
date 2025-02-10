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

api.route("GET /api/posts-directory", {
  handler: "functions/posts-directory/index.handler",
  copyFiles: [{ from: "assets/posts.json", to: 'functions/posts-directory/posts.json' }]
});

api.route("GET /api/posts-copy-files", {
  handler: "functions/posts-copy-files.handler",
  copyFiles: [{ from: "functions/posts.json" }]
});

api.route("GET /api/posts-no-bundle", {
  bundle: "functions",
  handler: "posts-no-bundle.handler",
});

api.route("GET /api/posts-dynamic-import", {
  handler: "functions/posts-dynamic-import.handler",
});

api.route("GET /api/posts-dynamic-import-no-bundle", {
  bundle: "functions",
  handler: "posts-dynamic-import-no-bundle.handler",
});