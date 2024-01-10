import { describe, test, expect } from 'vitest';
import type * as OpenAPITypes from '@/types';
import { collectOperations, } from '@/openapi';

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
                      'details',
                    ],
                    properties: {
                      userId: { type: 'integer' },
                      userName: { type: 'string' },
                      details: {
                        type: 'object',
                        required: [
                          'email',
                          'address',
                        ],
                        properties: {
                          age: { type: 'integer' },
                          email: { type: 'string' },
                          address: { type: 'string' },
                        },
                      },
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
    expect(result[0].hasHttp200Content).toBe(true);

    expect(result[1].operationId).toBe('putPath1API');
    expect(result[1].parameters).toBeUndefined();
    expect(result[1].hasHttp200Content).toBe(false);

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
    expect(result[2].hasHttp200Content).toBe(false);

    expect(result[3].operationId).toBe('DeletePath1API');
    expect(result[3].parameters).toBeUndefined();
    expect(result[3].hasHttp200Content).toBe(false);

    expect(result[4].operationId).toBe('optionsPath1API');
    expect(result[4].parameters).toBeUndefined();
    expect(result[4].hasHttp200Content).toBe(true);

    expect(result[5].operationId).toBe('headPath1API');
    expect(result[5].parameters).toBeUndefined();
    expect(result[5].hasHttp200Content).toBe(false);

    expect(result[6].operationId).toBe('patchPath1API');
    expect(result[6].parameters).toBeUndefined();
    expect(result[6].hasHttp200Content).toBe(false);

    expect(result[7].operationId).toBe('tracePath1API');
    expect(result[7].parameters).toBeUndefined();
    expect(result[7].hasHttp200Content).toBe(false);

    expect(result[8].operationId).toBe('postPath2API');
    expect(result[8].parameters).toBeUndefined();
    expect(result[8].hasHttp200Content).toBe(false);
  });
});
