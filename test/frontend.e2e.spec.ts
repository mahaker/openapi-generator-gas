import { describe, test, expect } from 'vitest';
import type * as OpenAPITypes from '@/types';
import { collectOperations, renderOperationsToStringForFrontend, } from '@/openapi';

describe('renderOperationsToStringForFrontend', () => {
  test('returns frontend code', () => {
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
    const result = renderOperationsToStringForFrontend(operations);

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

export function getPath1API(request: GetPath1APIRequest): Promise<GetPath1APIResponse> {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      .getPath1API(request);
  });
}

export function putPath1API(): Promise<void> {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      .putPath1API();
  });
}

export type PostPath1APIRequest = {
  userId: number;
  title: string;
  body?: string;
}

export function postPath1API(request: PostPath1APIRequest): Promise<void> {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      .postPath1API(request);
  });
}

export function DeletePath1API(): Promise<void> {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      .DeletePath1API();
  });
}

export function optionsPath1API(): Promise<OptionsPath1APIResponse> {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      .optionsPath1API();
  });
}

export function headPath1API(): Promise<void> {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      .headPath1API();
  });
}

export function patchPath1API(): Promise<void> {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      .patchPath1API();
  });
}

export function tracePath1API(): Promise<void> {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      .tracePath1API();
  });
}

export function postPath2API(): Promise<void> {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      .postPath2API();
  });
}

`
    );
  });
});