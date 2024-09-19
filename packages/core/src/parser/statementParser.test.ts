import { describe, expect, test } from 'vitest';
import { parseStatement } from './statementParser';

describe('parser/statementParser', () => {
  test('correctly parse', () => {
    const input = [
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
    ];
    const result = {
      currentReadIndex: 3,
      statement: {
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
    };
    expect(parseStatement(input, 0)).toEqual(result);
  });

  test('throw error when first argument is not ident', () => {
    const input = [
      {
        type: 'colon',
        literal: ':',
      },
      {
        type: 'ident',
        literal: 'close',
      },
    ];
    expect(() => parseStatement(input, 0)).toThrowError(
      `${JSON.stringify({
        type: 'colon',
        literal: ':',
      })} should be identifier.`,
    );
  });

  test('throw error when second argument is not colon', () => {
    const input = [
      {
        type: 'ident',
        literal: 'windowStatus',
      },
      {
        type: 'leftAngelBracket',
        literal: '<',
      },
      {
        type: 'ident',
        literal: 'close',
      },
    ];
    expect(() => parseStatement(input, 0)).toThrowError(
      `${JSON.stringify({
        type: 'leftAngelBracket',
        literal: '<',
      })} should be ":".`,
    );
  });

  test('throw error when third argument is not ident', () => {
    const input = [
      {
        type: 'ident',
        literal: 'windowStatus',
      },
      {
        type: 'colon',
        literal: ':',
      },
      {
        type: 'colon',
        literal: ':',
      },
    ];
    expect(() => parseStatement(input, 0)).toThrowError(
      `${JSON.stringify({
        type: 'colon',
        literal: ':',
      })} should be identifier.`,
    );
  });
});
