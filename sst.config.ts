/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "aws-sst-demo",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Function("Function", {
      bundle: "./src",
      handler: "index.handler",
      url: true,
    });
    await import("./infra/api-routes.js");
  },
});