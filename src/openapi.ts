import type * as OpenAPITypes from './types';
import { collectResponseSchemas, getResponseSchemaObjects, } from './classes/responseSchema';

const SUPPORTTED_METHODS: (keyof Omit<OpenAPITypes.PathItemObject, 'summary' | 'description'>)[] = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace',
];

type OperationParameters = {
  [name: string]: {
    required: boolean;
    type: 'integer' | 'number' | 'string';
  };
};
export type Operation = {
  operationId: string;
  parameters?: OperationParameters;
  hasHttp200Content?: boolean;
};

const collectOperations = (pathsObject: OpenAPITypes.PathsObject): Operation[] => {
  const paths = Object.values(pathsObject);
  const operations: Operation[] = [];
  
  for(const path of paths) {
    for(const method of SUPPORTTED_METHODS) {
      const op = path[method]
      // TODO throw error if operationId is duplicated
      if (op === undefined) continue;

      operations.push({
        operationId: op.operationId,
        parameters: getParameters(op),
        hasHttp200Content: hasHttp200Content(op),
      });
    }
  }

  return operations;
};

const getParameters = (operation: OpenAPITypes.OperationObject): OperationParameters | undefined => {
  const p = operation.parameters;
  if (p === undefined) {
    return;
  } else {
    const params = p.reduce((acc, cur) => {
      acc[cur.name] = {
        required: cur.required || false,
        type: cur.schema.type,
      };
      return acc;
    }, {} as OperationParameters);
    
    return params;
  }
};

const hasHttp200Content = (operation: OpenAPITypes.OperationObject): boolean => {
  const r = operation.responses;
  const http200Content = r[200]?.content?.['application/json'];
  if (http200Content === undefined) {
    return false;
  } else if (http200Content.schema.type !== 'object') {
    return false;
  } else {
    const responseIndetifierName = operation.operationId.slice(0, 1).toUpperCase() + operation.operationId.slice(1) + 'Response';
    collectResponseSchemas(responseIndetifierName, http200Content.schema);
    return true;
  }
};

const renderOperationsToStringForFrontend = (operations: Operation[]): OpenAPITypes.GeneratedCode => {
  let code = '';
  for (const o of getResponseSchemaObjects()) {
    code += o.toCode();
  }

  // TODO refactor: implement class for Operation and `render` method
  for(const operation of operations) {
    let parameterIdentifierName = '';
    if (operation.parameters !== undefined) {
      parameterIdentifierName = operation.operationId.slice(0, 1).toUpperCase() + operation.operationId.slice(1) + 'Request';

      code += `export type ${parameterIdentifierName} = {\n`
      for(const p of Object.keys(operation.parameters)) {
        code += `  ${p}${operation.parameters[p].required ? ':' : '?:'} ${operation.parameters[p].type === 'string' ? 'string' : 'number'};\n`
      }
      code += '};\n\n'
    }

    let responseIndetifierName = '';
    if (operation.hasHttp200Content) {
      // TODO move to responseSchema.ts
      responseIndetifierName = operation.operationId.slice(0, 1).toUpperCase() + operation.operationId.slice(1) + 'Response';
    }

    code += `export function ${operation.operationId}(${parameterIdentifierName ? 'request: ' + parameterIdentifierName : ''}): Promise<${operation.hasHttp200Content ? responseIndetifierName : 'void'}> {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      .${operation.operationId}(${parameterIdentifierName ? 'request': ''});
  });
}`;
    code += '\n\n';
  }
  return { code };
};

const renderOperationsToStringForBackend = (operations: Operation[]): OpenAPITypes.GeneratedCode => {
  let code = '';
  for (const o of getResponseSchemaObjects()) {
    code += o.toCode();
  }

  for(const operation of operations) {
    const operationIdentifierName = operation.operationId.slice(0, 1).toUpperCase() + operation.operationId.slice(1);

    let parameterIdentifierName = '';
    if (operation.parameters !== undefined) {
      parameterIdentifierName = `${operationIdentifierName}Request`;

      code += `export type ${parameterIdentifierName} = {\n`
      for(const p of Object.keys(operation.parameters)) {
        code += `  ${p}${operation.parameters[p].required ? ':' : '?:'} ${operation.parameters[p].type === 'string' ? 'string' : 'number'};\n`
      }
      code += '}\n\n'
    }

    let responseIndetifierName = '';
    if (operation.hasHttp200Content) {
      // TODO move to responseSchema.ts
      responseIndetifierName = `${operationIdentifierName}Response`;
    }

    code += `export type I${operationIdentifierName} = (${parameterIdentifierName ? 'request: ' + parameterIdentifierName : ''}) => ${operation.hasHttp200Content ? responseIndetifierName : 'void'};`;
    code += '\n\n';
  }
  return { code };
}

export { collectOperations, renderOperationsToStringForFrontend, renderOperationsToStringForBackend };
