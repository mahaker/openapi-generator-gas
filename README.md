# OpenAPI code generator for Google Apps Script

A CLI tool that generate codes for Google Apps Script.

An example project is [here](https://github.com/mahaker/openapi-gas-example).

## Roadmap

- [x] `.yml` file support
- [x] typescript code generation
- [ ] `requestBody` parsing(support `type: array`, `type: object` in object)
- [ ] `$ref` and `$component` parsing
- [ ] nested responses parsing(support `type: array`, `type: object` in object)
- [ ] `.json` file support
- [ ] javascript(jsdoc) code generation
- [ ] throw error for invalid input(a file specified by `--spec` option)
- [ ] http status `400` support(rejectable)

### not supported

- API spec bundle
   - Use a dedicated tool like [Redocly CLI](https://redocly.com/docs/cli/)

## Usage

```sh
npm install -D openapi-generator-gas
npx openapi-generator-gas --spec openapi.yml --outfile ./frontend/src/openapi.ts --frontend # Generate codes for frontend
npx openapi-generator-gas --spec openapi.yml --outfile ./backend/src/openapi.ts --backend # Generate codes for backend
```

## Example

- openapi.yml

```yml
openapi: 3.0.3
info:
  title: My OpenAPI spec
  summary: example spec
  version: 0.0.1
servers:
  - url: http://localhost:8080
    description: A local server

paths:
  /todo:
    get:
      summary: get TODO item                 # anything ok(not used)
      description: get TODO item             # anything ok(not used)
      operationId: getTodoItem
      parameters:
        - name: itemId
          in: query                          # anything ok(not used)
          required: true
          schema:
            type: integer
      responses:
        200:                                 # 200 only supported(will be function's return type)
          description: specific TODO item    # anything ok(not used)
          content:
            application/json:                # `application/json` only supported
              schema:
                type: object
                required:
                  - itemId
                  - title
                properties:
                  itemId:
                    type: integer
                  title:
                    type: string
                  description:
                    type: string
```

- generated codes for frontend

```typescript
export type GetTodoItemRequest = {
  itemId: number;
}

export type GetTodoItemResponse = {
  itemId: number;
  title: string;
  description?: string;
}

export function getTodoItem(request: GetTodoItemRequest): Promise<GetTodoItemResponse> {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      .getTodoItem(request);
  });
}
```

and codes that you implemented

```typescript
import { getTodoItem } from 'path/to/outfile.ts';

const test = async () => {
  const req = { itemId: 1 };
  const res = await getTodoItem(req);
};
```

- generated codes for backend

```typescript
export type GetTodoItemRequest = {
  itemId: number;
}

export type GetTodoItemResponse = {
  itemId: number;
  title: string;
  description?: string;
}

export type IGetTodoItem = (request: GetTodoItemRequest) => GetTodoItemResponse;
```

and codes that you implemented

```typescript
import type { IGetTodoItem } from 'path/to/outfile.ts';

const getTodoItem: IGetTodoItem = (req) => {
  const itemId = req.itemId;

  return {
    itemId: 1,
    title: 'Some title',
    description: 'Some description',
  }
}
```
