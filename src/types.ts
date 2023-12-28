export type ResponseSchema = {
  type: 'integer' | 'number' | 'string' | 'object',
  required?: string[], // if type='object', maybe exists this property
  properties?: { // if type='object', required this property
    [propertyName: string]: ResponseSchema,
  },
};

export type ResponseObject = {
  description: '',
  content?: {
    [contentType: string]: {  // support application/json only
      schema: ResponseSchema,
    },
  },
};

export type ResponsesObject = {
  [httpStatus: number]: ResponseObject; // support 200 only
};

export type ParameterObject = {
  name: string;
  required?: boolean;
  schema: { type: 'integer' | 'number' | 'string' };
};

export type OperationObject = {
  summary: string;
  description: string;
  operationId: string;
  parameters?: ParameterObject[];
  responses: ResponsesObject;
};

export type PathItemObject = {
  summary: string;
  description: string;
  get?: OperationObject;
  put?: OperationObject;
  post?: OperationObject;
  delete?: OperationObject;
  options?: OperationObject;
  head?: OperationObject;
  patch?: OperationObject;
  trace?: OperationObject;
};

export type PathsObject = {
  [path: string]: PathItemObject;
};

export type OpenAPIObject = {
  paths: PathsObject;
};

export type GeneratedCode = {
  code: string;
};
