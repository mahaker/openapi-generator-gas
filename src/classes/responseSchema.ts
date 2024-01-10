import type * as OpenAPITypes from '../types';

export class ResponseSchemaPrimitive {
  readonly #propertyName: string;
  readonly #type: string;
  readonly #isRequired: boolean;

  constructor(propertyName: string, type: string, isRequired: boolean) {
    this.#propertyName = propertyName;
    this.#type = type;
    this.#isRequired = isRequired;
  }

  public toCode(): string {
    let type: string;
    switch(this.#type) {
      case 'integer':
      case 'number':
        type = 'number';
        break;
      case 'string':
        type = 'string';
        break;
      default:
        type = this.#type;
    }

    return `${this.#propertyName}${this.#isRequired ? '' : '?'}: ${type};`;
  }
}

export class ResponseSchemaObject {
  readonly #schemaName: string;
  readonly #primitives: ResponseSchemaPrimitive[];

  constructor(schemaName: string, primitives: ResponseSchemaPrimitive[]) {
    this.#schemaName = schemaName;
    this.#primitives = primitives;
  }

  public toCode(): string {
    let code = '';
    code += `export type ${this.#schemaName} = {\n`;
    for (const primitive of this.#primitives) {
      code += `  ${primitive.toCode()}\n`;
    }
    code += '};\n\n';

    return code;
  }
}

let responseSchemaObjects: ResponseSchemaObject[] = [];
export const getResponseSchemaObjects = () => responseSchemaObjects;
export const collectResponseSchemas = (schemaName: string, schemaDef: OpenAPITypes.ResponseSchema) => {
  const primitives: ResponseSchemaPrimitive[] = [];
  const requiredProps = new Set(schemaDef.required);

  Object.entries(schemaDef.properties!).forEach(property => {
    const [propertyName, propertyDef] = property;

    if (propertyDef.type === 'object') {
      const schemaNameForProperty = schemaName + 'Of' + propertyName.slice(0, 1).toUpperCase() + propertyName.slice(1);
      primitives.push(new ResponseSchemaPrimitive(propertyName, schemaNameForProperty, requiredProps.has(propertyName)));
      collectResponseSchemas(schemaNameForProperty, propertyDef);
    } else {
      primitives.push(new ResponseSchemaPrimitive(propertyName, propertyDef.type, requiredProps.has(propertyName)));
    }
  });
  responseSchemaObjects.push(new ResponseSchemaObject(schemaName, primitives));
}
