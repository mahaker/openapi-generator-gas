import { describe, test, expect } from 'vitest';
import type * as OpenAPITypes from '@/types';
import { collectOperations, renderOperationsToStringForBackend, } from '@/openapi';

describe('renderOperationsToStringForBackend', () => {
  test('returns backend code', () => {
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
    const operations = collectOperations(paths);
    const result = renderOperationsToStringForBackend(operations);

    // assert
    expect(result.code).toBe(
`export type GetPath1APIResponseOfDetails = {
  age?: number;
  email: string;
  address: string;
};

export type GetPath1APIResponse = {
  userId: number;
  userName?: string;
  details: GetPath1APIResponseOfDetails;
};

export type OptionsPath1APIResponse = {
  address?: string;
  phoneNumber?: string;
};

export type GetPath1APIRequest = {
  userId: number;
}

export type IGetPath1API = (request: GetPath1APIRequest) => GetPath1APIResponse;

export type IPutPath1API = () => void;

export type PostPath1APIRequest = {
  userId: number;
  title: string;
  body?: string;
}

export type IPostPath1API = (request: PostPath1APIRequest) => void;

export type IDeletePath1API = () => void;

export type IOptionsPath1API = () => OptionsPath1APIResponse;

export type IHeadPath1API = () => void;

export type IPatchPath1API = () => void;

export type ITracePath1API = () => void;

export type IPostPath2API = () => void;

`
    );
  });
});