import { describe, test, expect, } from 'vitest';
import { ResponseSchemaPrimitive, ResponseSchemaObject, } from './responseSchema';

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
