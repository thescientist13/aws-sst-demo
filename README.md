# aws-sst-demo

A simple reproduction repo of using AWS with [**SST**](https://sst.dev/).

## Setup

1. Clone the repo
1. Have latest NodeJS LTS (or run `nvm use` if you have [**NVM**](https://github.com/nvm-sh/nvm) installed)
1. Run `npm ci`
1. Have your [AWS credentials setup](https://guide.sst.dev/chapters/configure-the-aws-cli.html) (or put them in a _.env_ at the root of the repo) and all the permissions detailed in [this guide](https://guide.sst.dev/chapters/create-an-iam-user.html)

## Demos

To run SST locally, run `npm run sst:dev`.  To deploy, run `npm run sst:preview`.

> All functions are in the _functions/_ directory and defined in _infra/api-routes.ts_

### ✅ `/api/hello`

A function that returns a string of _Hello World_.

```sh
|  Build       functions/hello.handler
|  Invoke      functions/hello.handler
|  Done        took +222ms
```

### ✅ `/api/greeting`

A function that returns JSON and accepts an optional `?name=xxx` query param to return a custom message.

```sh
|  Build       functions/greeting.handler
|  Invoke      functions/greeting.handler
|  +21ms       {
|  +21ms         params: URLSearchParams { 'name' => 'sst' },
|  +21ms         name: 'sst',
|  +21ms         data: { message: 'Hello, sst!' }
|  +21ms       }
|  Done        took +164ms
```

### 🚫 `/api/posts`

A function that loads _functions/posts.json_ using Node's `fs` API combined with `new URL` + `import.meta.url` to return some JSON.

```sh
|  Build       functions/posts.handler
|  Error       functions/posts.handler
|  ENOENT: no such file or directory, open '/Users/owenbuckley/Workspace/github/aws-sst-demo/.sst/artifacts/ApiRouteEssmdb
Handler-dev/posts.json'
```

### 🚫 `/api/posts-directory`

Like `/api/posts` but is contained in a directory and uses SST's [copyFiles](https://sst.dev/docs/component/aws/function#copyfiles) option for the JSON file.

```sh
|  Build       functions/posts-directory/index.handler
|  Error       functions/posts-directory/index.handler
|  ENOENT: no such file or directory, open '/Users/owenbuckley/Workspace/github/aws-sst-demo/.sst/artifac
ts/ApiRouteVenkonHandler-dev/posts.json'
|  ↳ at async open (node:internal/fs/promises:638:25)
|  ↳ at async Object.readFile (node:internal/fs/promises:1242:14)
|  ↳ at async <anonymous> (/Users/owenbuckley/Workspace/github/aws-sst-demo/functions/posts-directory/ind
ex.ts:4:25)
```

### 🚫 `/api/posts-directory-no-bundle`

Like `/api/posts-directory` but uses SST's [no bundling](https://sst.dev/docs/component/aws/function#bundle) feature and the [copyFiles](https://sst.dev/docs/component/aws/function#copyfiles) option for the JSON file.

```sh
|  Build       index.handler
|  Error       index.handler
|  The "path" argument must be of type string. Received undefined
|  ↳ TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined
|  ↳ at validateString (node:internal/validators:162:11)
|  ↳ at Object.pathToFileURL (node:url:1024:3)
|  ↳ at file:///Users/owenbuckley/Workspace/github/aws-sst-demo/.sst/platform/dist/nodejs-runtime/index.j
s:33:24
|  ↳ at ModuleJob.run (node:internal/modules/esm/module_job:218:25)
|  ↳ at async ModuleLoader.import (node:internal/modules/esm/loader:329:24)
|  ↳ at async loadESM (node:internal/process/esm_loader:34:7)
|  ↳ at async handleMainPromise (node:internal/modules/run_main:113:12)
```

### 🚫 `/api/posts-directory-async-no-bundle`

Like `/api/posts-directory` but uses SST's [no bundling](https://sst.dev/docs/component/aws/function#bundle) feature with an `async` function.

```sh
|  Build       index.handler
|  Error       index.handler
|  The "path" argument must be of type string. Received undefined
|  ↳ TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined
|  ↳ at Object.pathToFileURL (node:url:1018:3)
|  ↳ at file:///Users/owenbuckley/Workspace/github/aws-sst-demo/.sst/platform/dist/nodejs-runtime/index.j
s:33:24
|  ↳ at ModuleJob.run (node:internal/modules/esm/module_job:271:25)
|  ↳ at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:547:26)
|  ↳ at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)
```

### 🚫 `/api/posts-copy-files`

Like `/api/posts` but uses SST's [copyFiles](https://sst.dev/docs/component/aws/function#copyfiles) option.

```sh
|  Build       functions/posts-copy-files.handler
|  Error       functions/posts-copy-files.handler
|  ENOENT: no such file or directory, open '/Users/owenbuckley/Workspace/github/aws-sst-demo/.sst/artifacts/ApiRouteZmetao
Handler-dev/posts.json'
```

### 🚫 `/api/posts-no-bundle`

Like `/api/posts` but uses SST's [no bundling](https://sst.dev/docs/component/aws/function#bundle) option.

```sh
|  Build       posts-no-bundle.handler
|  Error       posts-no-bundle.handler
|  The "path" argument must be of type string. Received undefined
|  ↳ TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined
|  ↳ at validateString (node:internal/validators:162:11)
|  ↳ at Object.pathToFileURL (node:url:1024:3)
|  ↳ at file:///Users/owenbuckley/Workspace/github/aws-sst-demo/.sst/platform/dist/nodejs-runtime/index.js:33:24
|  ↳ at ModuleJob.run (node:internal/modules/esm/module_job:218:25)
|  ↳ at async ModuleLoader.import (node:internal/modules/esm/loader:329:24)
|  ↳ at async loadESM (node:internal/process/esm_loader:34:7)
|  ↳ at async handleMainPromise (node:internal/modules/run_main:113:12)
```

### 🚫 `/api/posts-dynamic-import`

A function that dynamically imports an `async` function from _functions/posts-service.js_ to return some JSON.

```sh
|  Build       functions/posts-dynamic-import.handler
|  Invoke      functions/posts-dynamic-import.handler
|  Error       functions/posts-dynamic-import.handler
|  Cannot find module '/Users/owenbuckley/Workspace/github/aws-sst-demo/.sst/artifacts/ApiRouteSfmbadHandler-dev/products-
service.js' imported from /Users/owenbuckley/Workspace/github/aws-sst-demo/.sst/artifacts/ApiRouteSfmbadHandler-dev/bundle
.mjs
|  ↳ Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/Users/owenbuckley/Workspace/github/aws-sst-demo/.sst/artifacts/Api
RouteSfmbadHandler-dev/products-service.js' imported from /Users/owenbuckley/Workspace/github/aws-sst-demo/.sst/artifacts/
ApiRouteSfmbadHandler-dev/bundle.mjs
|  ↳ at finalizeResolution (node:internal/modules/esm/resolve:255:11)
|  ↳ at moduleResolve (node:internal/modules/esm/resolve:908:10)
|  ↳ at defaultResolve (node:internal/modules/esm/resolve:1121:11)
|  ↳ at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:396:12)
|  ↳ at ModuleLoader.resolve (node:internal/modules/esm/loader:365:25)
|  ↳ at ModuleLoader.getModuleJob (node:internal/modules/esm/loader:240:38)
|  ↳ at ModuleLoader.import (node:internal/modules/esm/loader:328:34)
|  ↳ at importModuleDynamically (node:internal/modules/esm/translators:146:35)
|  ↳ at importModuleDynamicallyCallback (node:internal/modules/esm/utils:176:14)
|  ↳ at handler (/Users/owenbuckley/Workspace/github/aws-sst-demo/functions/posts-dynamic-import.ts:5:40)
```

### 🚫 `/api/posts-dynamic-import-no-bundle`

Like `/api/posts-dynamic-import` but uses SST's [no bundling](https://sst.dev/docs/component/aws/function#bundle) option.

```sh
|  Build       posts-dynamic-import-no-bundle.handler
|  Error       posts-dynamic-import-no-bundle.handler
|  The "path" argument must be of type string. Received undefined
|  ↳ TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined
|  ↳ at validateString (node:internal/validators:162:11)
|  ↳ at Object.pathToFileURL (node:url:1024:3)
|  ↳ at file:///Users/owenbuckley/Workspace/github/aws-sst-demo/.sst/platform/dist/nodejs-runtime/index.js:33:24
|  ↳ at ModuleJob.run (node:internal/modules/esm/module_job:218:25)
|  ↳ at async ModuleLoader.import (node:internal/modules/esm/loader:329:24)
|  ↳ at async loadESM (node:internal/process/esm_loader:34:7)
|  ↳ at async handleMainPromise (node:internal/modules/run_main:113:12)
```