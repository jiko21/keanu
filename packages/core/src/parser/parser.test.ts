import { describe, expect, test } from 'vitest';
import { Parser } from './parser';

describe('parser', () => {
  test('correctly parse status', () => {
    const input = [
      {
        type: 'status',
        literal: 'status',
      },
      {
        type: 'ident',
        literal: 'Hogehoge',
      },
      {
        type: 'leftAngelBracket',
        literal: '<',
      },
      {
        type: 'ident',
        literal: 'total',
      },
      {
        type: 'colon',
        literal: ':',
      },
      {
        type: 'ident',
        literal: 'close',
      },
      {
        type: 'rightAngelBracket',
        literal: '>',
      },
      {
        type: 'leftBrace',
        literal: '{',
      },
      {
        type: 'ident',
        literal: 'windowStatus',
      },
      {
        type: 'colon',
        literal: ':',
      },
      {
        type: 'ident',
        literal: 'close',
      },
      {
        type: 'ident',
        literal: 'doorStatus',
      },
      {
        type: 'colon',
        literal: ':',
      },
      {
        type: 'ident',
        literal: 'close',
      },
      {
        type: 'rightBrace',
        literal: '}',
      },
    ];

    const result = [
      {
        type: 'status',
        indentifier: {
          type: 'identifier',
          value: {
            type: 'textWithoutSpace',
            value: 'Hogehoge',
          },
        },
        statement: {
          type: 'statement',
          indentifier: {
            type: 'identifier',
            value: {
              type: 'textWithoutSpace',
              value: 'total',
            },
          },
          value: {
            type: 'value',
            value: {
              type: 'textWithoutSpace',
              value: 'close',
            },
          },
        },
        statements: {
          type: 'statements',
          statements: [
            {
              type: 'statement',
              indentifier: {
                type: 'identifier',
                value: {
                  type: 'textWithoutSpace',
                  value: 'windowStatus',
                },
              },
              value: {
                type: 'value',
                value: {
                  type: 'textWithoutSpace',
                  value: 'close',
                },
              },
            },
            {
              type: 'statement',
              indentifier: {
                type: 'identifier',
                value: {
                  type: 'textWithoutSpace',
                  value: 'doorStatus',
                },
              },
              value: {
                type: 'value',
                value: {
                  type: 'textWithoutSpace',
                  value: 'close',
                },
              },
            },
          ],
        },
      },
    ];

    const target = new Parser(input);
    expect(target.parse()).toEqual(result);
  });

  test('throw error when parsing status(ident not found)', () => {
    const input = [
      {
        type: 'status',
        literal: 'status',
      },
      {
        type: 'leftAngelBracket',
        literal: '<',
      },
    ];
    const target = new Parser(input);

    expect(() => target.parse()).toThrowError(
      `${JSON.stringify({
        type: 'leftAngelBracket',
        literal: '<',
      })} should be identifier.`,
    );
  });

  test('throw error when parsing status(leftAngelBracket not found)', () => {
    const input = [
      {
        type: 'status',
        literal: 'status',
      },
      {
        type: 'ident',
        literal: 'Hogehoge',
      },
      {
        type: 'ident',
        literal: 'total',
      },
    ];
    const target = new Parser(input);

    expect(() => target.parse()).toThrowError(
      `${JSON.stringify({
        type: 'ident',
        literal: 'total',
      })} should be "<".`,
    );
  });

  test('throw error when parsing status(rightAngelBracket not found)', () => {
    const input = [
      {
        type: 'status',
        literal: 'status',
      },
      {
        type: 'ident',
        literal: 'Hogehoge',
      },
      {
        type: 'leftAngelBracket',
        literal: '<',
      },
      {
        type: 'ident',
        literal: 'total',
      },
      {
        type: 'colon',
        literal: ':',
      },
      {
        type: 'ident',
        literal: 'close',
      },
      {
        type: 'leftBrace',
        literal: '{',
      },
    ];
    const target = new Parser(input);

    expect(() => target.parse()).toThrowError(
      `${JSON.stringify({
        type: 'leftBrace',
        literal: '{',
      })} should be ">".`,
    );
  });

  test('throw error when parsing status(rightAngelBracket not found)', () => {
    const input = [
      {
        type: 'status',
        literal: 'status',
      },
      {
        type: 'ident',
        literal: 'Hogehoge',
      },
      {
        type: 'leftAngelBracket',
        literal: '<',
      },
      {
        type: 'ident',
        literal: 'total',
      },
      {
        type: 'colon',
        literal: ':',
      },
      {
        type: 'ident',
        literal: 'close',
      },
      {
        type: 'rightAngelBracket',
        literal: '>',
      },
      {
        type: 'ident',
        literal: 'total',
      },
    ];
    const target = new Parser(input);

    expect(() => target.parse()).toThrowError(
      `${JSON.stringify({
        type: 'ident',
        literal: 'total',
      })} should be "{".`,
    );
  });

  test('throw error when parsing status(rightAngelBracket not found)', () => {
    const input = [
      {
        type: 'status',
        literal: 'status',
      },
      {
        type: 'ident',
        literal: 'Hogehoge',
      },
      {
        type: 'leftAngelBracket',
        literal: '<',
      },
      {
        type: 'ident',
        literal: 'total',
      },
      {
        type: 'colon',
        literal: ':',
      },
      {
        type: 'ident',
        literal: 'close',
      },
      {
        type: 'rightAngelBracket',
        literal: '>',
      },
      {
        type: 'leftBrace',
        literal: '{',
      },
      {
        type: 'rightAngelBracket',
        literal: '>',
      },
    ];
    const target = new Parser(input);

    expect(() => target.parse()).toThrowError(
      `${JSON.stringify({
        type: 'rightAngelBracket',
        literal: '>',
      })} should be "}".`,
    );
  });
});
