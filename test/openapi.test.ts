import { describe, test, expect } from 'vitest';
import type * as OpenAPITypes from '@/types';
import { Operation, collectOperations, renderOperationsToStringForFrontend } from '@/openapi';

describe('collectOperations', () => {
  test('returns empty array if paths is empty', () => {
    // arrange
    const paths: OpenAPITypes.PathsObject = {};

    // action
    const result = collectOperations(paths);

    // assert
    expect(result.length).toBe(0);
  });

  test('returns operations array', () => {
    // arrange
    const paths: OpenAPITypes.PathsObject = {
      '/path1': {
        summary: '',
        description: '',
        get: {
          summary: '',
          description: '',
          operationId: 'getPath1API',
          parameters: [
            {
              name: 'userId',
              required: true,
              schema: { type: 'integer' }
            },
          ],
          responses: {
            200: {
              description: '',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: [
                      'userId',
                    ],
                    properties: {
                      userId: { type: 'integer' },
                      userName: { type: 'string' },
                    },
                  },
                },
              },
            },
            400: {
              description: '',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: [
                      'errorMessage',
                    ],
                    properties: {
                      errorMessage: { type: 'string' },
                    },
                  },
                },
              },
            }
          },
        },
        put: {
          summary: '',
          description: '',
          operationId: 'putPath1API',
          responses: {
            200: {
              description: '',
            }
          }
        },
        post: {
          summary: '',
          description: '',
          operationId: 'postPath1API',
          parameters: [
            {
              name: 'userId',
              required: true,
              schema: { type: 'integer' }
            },
            {
              name: 'title',
              required: true,
              schema: { type: 'string' }
            },
            {
              name: 'body',
              schema: { type: 'string' }
            },
          ],
          responses: {
            200: {
              description: '',
            }
          }
        },
        delete: {
          summary: '',
          description: '',
          operationId: 'DeletePath1API',
          responses: {
            200: {
              description: '',
            }
          }
        },
        options: {
          summary: '',
          description: '',
          operationId: 'optionsPath1API',
          responses: {
            200: {
              description: '',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      address: { type: 'string' },
                      phoneNumber: { type: 'string' },
                    },
                  },
                },
              },
            }
          }
        },
        head: {
          summary: '',
          description: '',
          operationId: 'headPath1API',
          responses: {
            200: {
              description: '',
            }
          }
        },
        patch: {
          summary: '',
          description: '',
          operationId: 'patchPath1API',
          responses: {
            200: {
              description: '',
            }
          }
        },
        trace: {
          summary: '',
          description: '',
          operationId: 'tracePath1API',
          responses: {
            200: {
              description: '',
            }
          }
        },
      },
      '/path2': {
        summary: '',
        description: '',
        post: {
          summary: '',
          description: '',
          operationId: 'postPath2API',
          responses: {
            200: {
              description: '',
            }
          }
        },
      },
    };

    // action
    const result = collectOperations(paths);

    // assert
    expect(result.length).toBe(9);
    expect(result[0].operationId).toBe('getPath1API');
    expect(result[0].parameters).toStrictEqual({
      userId: {
        required: true,
        type: 'integer',
      },
    });
    expect(result[0].http200Content).toStrictEqual({
      userId: {
        required: true,
        type: 'integer',
      },
      userName: {
        required: false,
        type: 'string',
      },
    });

    expect(result[1].operationId).toBe('putPath1API');
    expect(result[1].parameters).toBeUndefined();
    expect(result[1].http200Content).toBeUndefined();

    expect(result[2].operationId).toBe('postPath1API');
    expect(result[2].parameters).toStrictEqual({
      userId: {
        required: true,
        type: 'integer',
      },
      title: {
        required: true,
        type: 'string',
      },
      body: {
        required: false,
        type: 'string'
      },
    });
    expect(result[2].http200Content).toBeUndefined();

    expect(result[3].operationId).toBe('DeletePath1API');
    expect(result[3].parameters).toBeUndefined();
    expect(result[3].http200Content).toBeUndefined();

    expect(result[4].operationId).toBe('optionsPath1API');
    expect(result[4].parameters).toBeUndefined();
    expect(result[4].http200Content).toStrictEqual({
      address: {
        required: false,
        type: 'string',
      },
      phoneNumber: {
        required: false,
        type: 'string',
      },
    });

    expect(result[5].operationId).toBe('headPath1API');
    expect(result[5].parameters).toBeUndefined();
    expect(result[5].http200Content).toBeUndefined();

    expect(result[6].operationId).toBe('patchPath1API');
    expect(result[6].parameters).toBeUndefined();
    expect(result[6].http200Content).toBeUndefined();

    expect(result[7].operationId).toBe('tracePath1API');
    expect(result[7].parameters).toBeUndefined();
    expect(result[7].http200Content).toBeUndefined();

    expect(result[8].operationId).toBe('postPath2API');
    expect(result[8].parameters).toBeUndefined();
    expect(result[8].http200Content).toBeUndefined();
  });
});

describe('renderOperationsToStringForFrontend', () => {
  test('returns frontend code', () => {
    // arrange
    const operations: Operation[] = [
      {
        operationId: 'getHoge',
        parameters: {
          userId: {
            required: true,
            type: 'integer',
          },
        },
        http200Content: {
          userName: {
            required: true,
            type: 'string',
          },
          age: {
            required: false,
            type: 'integer',
          },
          type: {
            required: true,
            type: 'number',
          },
        },
      },
      {
        operationId: 'postHoge',
        parameters: {
          userId: {
            required: true,
            type: 'integer',
          },
          itemId: {
            required: true,
            type: 'number',
          },
          content: {
            required: false,
            type: 'string',
          },
        }
      },
      {
        operationId: 'putHoge',
      },
    ];

    // action
    const result = renderOperationsToStringForFrontend(operations);

    // assert
    expect(result.code).toBe(
`export type GetHogeRequest = {
  userId: number;
}

export type GetHogeResponse = {
  userName: string;
  age?: number;
  type: number;
}

export function getHoge(request: GetHogeRequest): Promise<GetHogeResponse> {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      .getHoge(request);
  });
}

export type PostHogeRequest = {
  userId: number;
  itemId: number;
  content?: string;
}

export function postHoge(request: PostHogeRequest): Promise<any> {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      .postHoge(request);
  });
}

export function putHoge(): Promise<any> {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      .putHoge();
  });
}

`
    );
  });
});
