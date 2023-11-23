import type * as OpenAPITypes from './types';

const SUPPORTTED_METHODS: (keyof Omit<OpenAPITypes.PathItemObject, 'summary' | 'description'>)[] = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];

type Http200Content = {
  [propertyName: string]: {
    required: boolean;
    type: 'integer' | 'number' | 'string';
  };
};
type OperationParameters = {
  [name: string]: {
    required: boolean;
    type: 'integer' | 'number' | 'string';
  };
};
export type Operation = {
  operationId: string;
  parameters?: OperationParameters;
  http200Content?: Http200Content;
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
        http200Content: getHttp200Content(op),
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

const getHttp200Content = (operation: OpenAPITypes.OperationObject): Http200Content | undefined => {
  const r = operation.responses;
  const http200Content = r[200]?.content?.['application/json'];
  if (http200Content === undefined) {
    return undefined;
  } else if (http200Content.schema.type !== 'object') {
    return undefined;
  } else {
    const requiredProps = new Set(http200Content.schema.required);
    const content = Object.entries(http200Content.schema.properties).reduce((acc, property) => {
      const propertyName = property[0];

      acc[propertyName] = {
        required: requiredProps.has(propertyName),
        type: property[1].type,
      };
      return acc;
    }, {} as Http200Content);

    return content;
  }
};

const renderOperationsToStringForFrontend = (operations: Operation[]): OpenAPITypes.GeneratedCode => {
  let code = '';

  // TODO refactor: implement class for Operation and `render` method
  for(const operation of operations) {
    let parameterIdentifierName = '';
    if (operation.parameters !== undefined) {
      parameterIdentifierName = operation.operationId.slice(0, 1).toUpperCase() + operation.operationId.slice(1) + 'Request';

      code += `export type ${parameterIdentifierName} = {\n`
      for(const p of Object.keys(operation.parameters)) {
        code += `  ${p}${operation.parameters[p].required ? ':' : '?:'} ${operation.parameters[p].type === 'string' ? 'string' : 'number'};\n`
      }
      code += '}\n\n'
    }

    let responseIndetifierName = '';
    if (operation.http200Content !== undefined) {
      responseIndetifierName = operation.operationId.slice(0, 1).toUpperCase() + operation.operationId.slice(1) + 'Response';

      code += `export type ${responseIndetifierName} = {\n`
      for(const p of Object.keys(operation.http200Content)) {
        code += `  ${p}${operation.http200Content[p].required ? ':' : '?:'} ${operation.http200Content[p].type === 'string' ? 'string' : 'number'};\n`
      }
      code += '}\n\n'
    }

    code += `export function ${operation.operationId}(${parameterIdentifierName ? 'request: ' + parameterIdentifierName : ''}): Promise<${operation.http200Content ? responseIndetifierName : 'any'}> {
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

export { collectOperations, renderOperationsToStringForFrontend };
