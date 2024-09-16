import { describe, expect, test } from 'vitest';
import { Lexer } from './lexer';

describe('lexer/lexer.ts', () => {
  test('correctly parse simple token', () => {
    const input = `<{ } >( )  
-:`;
    const result = [
      {
        type: 'leftAngelBracket',
        literal: '<',
      },
      {
        type: 'leftBrace',
        literal: '{',
      },
      {
        type: 'rightBrace',
        literal: '}',
      },
      {
        type: 'rightAngelBracket',
        literal: '>',
      },
      {
        type: 'leftParentheses',
        literal: '(',
      },
      {
        type: 'rightParentheses',
        literal: ')',
      },
      {
        type: 'hyphen',
        literal: '-',
      },
      {
        type: 'colon',
        literal: ':',
      },
    ];
    const target = new Lexer(input);
    expect(target.parseToTokens()).toEqual(result);
  });

  test('correctly parse tokens and literals', () => {
    const input = `status Hogehoge<total: close> {
	windowStatus: close
	doorStatus: close
}`;
    const result = [
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
    const target = new Lexer(input);
    expect(target.parseToTokens()).toEqual(result);
  });

  test('correctly parse literal and tokens (flow)', () => {
    const input = 'Hogehoge -(open door)-> Hogehoge2';
    const result = [
      {
        type: 'ident',
        literal: 'Hogehoge',
      },

      {
        type: 'hyphen',
        literal: '-',
      },
      {
        type: 'leftParentheses',
        literal: '(',
      },
      {
        type: 'ident',
        literal: 'open door',
      },
      {
        type: 'rightParentheses',
        literal: ')',
      },
      {
        type: 'hyphen',
        literal: '-',
      },
      {
        type: 'rightAngelBracket',
        literal: '>',
      },

      {
        type: 'ident',
        literal: 'Hogehoge2',
      },
    ];
    const target = new Lexer(input);

    expect(target.parseToTokens()).toEqual(result);
  });
});
