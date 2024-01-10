import { describe, test, expect, } from 'vitest';
import { collectResponseSchemas, getResponseSchemaObjects, ResponseSchemaPrimitive, ResponseSchemaObject, } from './responseSchema';
import type { ResponseSchema } from '@/types';

describe('ResponseSchemaPrimitive#toCode', () => {
  test('render code', () => {
    // arrange
    const p1 = new ResponseSchemaPrimitive('prop1', 'integer', true);
    const p2 = new ResponseSchemaPrimitive('prop2', 'number', true);
    const p3 = new ResponseSchemaPrimitive('prop3', 'string', true);
    const p4 = new ResponseSchemaPrimitive('prop4', 'Hoge', true);
    const p5 = new ResponseSchemaPrimitive('prop5', 'Fuga', false);

    // action & assert
    expect(p1.toCode()).toBe('prop1: number;');
    expect(p2.toCode()).toBe('prop2: number;');
    expect(p3.toCode()).toBe('prop3: string;');
    expect(p4.toCode()).toBe('prop4: Hoge;');
    expect(p5.toCode()).toBe('prop5?: Fuga;');
  });
});

describe('ResponseSchemaObject#toCode', () => {
  test('render code', () => {
    // arrange
    const p1 = new ResponseSchemaPrimitive('prop1', 'integer', true);
    const p2 = new ResponseSchemaPrimitive('prop2', 'number', true);
    const p3 = new ResponseSchemaPrimitive('prop3', 'string', true);
    const p4 = new ResponseSchemaPrimitive('prop4', 'Hoge', true);
    const p5 = new ResponseSchemaPrimitive('prop5', 'Fuga', false);

    const o = new ResponseSchemaObject('TestResponse', [p1, p2, p3, p4, p5]);

    // action & assert
    expect(o.toCode()).toBe(
`export type TestResponse = {
  prop1: number;
  prop2: number;
  prop3: string;
  prop4: Hoge;
  prop5?: Fuga;
};

`
    );
  });
});

describe('collectResponseSchemas', () => {
  test('get response schemas', () => {
    // arrange
    const schemaName = 'AnExampleApiResponse';
    const schemaDef: ResponseSchema = {
      type: 'object',
      required: ['prop1', 'prop4',],
      properties: {
        prop1: {
          type: 'integer',
        },
        prop2: {
          type: 'object',
          required: ['prop21'],
          properties: {
            prop21: { type: 'number', },
            prop22: { type: 'string', },
          },
        },
        prop3: {
          type: 'string',
        },
        prop4: {
          type: 'object',
          required: ['prop42'],
          properties: {
            prop41: {
              type: 'object',
              properties: {
                prop421: { type: 'integer', },
                prop422: { type: 'integer', },
              }
            },
            prop42: { type: 'string', },
          },
        },
      },
    };

    // action
    collectResponseSchemas(schemaName, schemaDef);
    const responseSchemas = getResponseSchemaObjects();

    // assert
    expect(responseSchemas.length).toBe(4);

    expect(responseSchemas[0].toCode()).toBe(
`export type AnExampleApiResponseOfProp2 = {
  prop21: number;
  prop22?: string;
};

`
    );
    
    expect(responseSchemas[1].toCode()).toBe(
`export type AnExampleApiResponseOfProp4OfProp41 = {
  prop421?: number;
  prop422?: number;
};

`
    );

    expect(responseSchemas[2].toCode()).toBe(
`export type AnExampleApiResponseOfProp4 = {
  prop41?: AnExampleApiResponseOfProp4OfProp41;
  prop42: string;
};

`
    );

    expect(responseSchemas[3].toCode()).toBe(
`export type AnExampleApiResponse = {
  prop1: number;
  prop2?: AnExampleApiResponseOfProp2;
  prop3?: string;
  prop4: AnExampleApiResponseOfProp4;
};

`
    );
  });
});
