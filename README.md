# OpenAPI generator for Google Apps Script

This is CLI tool that generate codes for Google Apps Script.

## Roadmap

- [x] `.yml` file support
- [ ] typescript code generation
- [ ] `requestBody` parsing
- [ ] `$ref` and `$component` parsing
- [ ] nested parameters parsing
- [ ] nested responses parsing
- [ ] `.json` file support
- [ ] javascript(jsdoc) code generation
- [ ] throw error for invalid input
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
        200:                                 # 200 status will be Return Type for function
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
```

- generated codes for backend

```typescript
```
