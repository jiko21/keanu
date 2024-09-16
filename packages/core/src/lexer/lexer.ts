import type { Token } from '../token';

class ParseError extends Error {}

export class Lexer {
  input = '';
  currentPosition: number;
  readCurrentPosition: number;
  inParentheses: boolean;

  constructor(input: string) {
    this.input = input;
    this.currentPosition = 0;
    this.readCurrentPosition = 0;
    this.inParentheses = false;
  }

  parseToTokens(): Token[] {
    const result = [];
    while (this._hasNext()) {
      result.push(this._parse());
    }
    return result;
  }

  private _parse(): Token {
    this._skipWhitespace();
    let currentToken: Token | null = null;
    const currentChar = this.input[this.currentPosition];
    this.readCurrentPosition = this.currentPosition;
    switch (currentChar) {
      case '<':
        currentToken = {
          type: 'leftAngelBracket',
          literal: '<',
        };
        break;
      case '{':
        currentToken = {
          type: 'leftBrace',
          literal: '{',
        };
        break;
      case '}':
        currentToken = {
          type: 'rightBrace',
          literal: '}',
        };
        break;
      case '>':
        currentToken = {
          type: 'rightAngelBracket',
          literal: '>',
        };
        break;
      case '(':
        currentToken = {
          type: 'leftParentheses',
          literal: '(',
        };
        this.inParentheses = true;
        break;
      case ')':
        currentToken = {
          type: 'rightParentheses',
          literal: ')',
        };
        this.inParentheses = false;
        break;
      case '-':
        currentToken = {
          type: 'hyphen',
          literal: '-',
        };
        break;
      case ':':
        currentToken = {
          type: 'colon',
          literal: ':',
        };
        break;
      default:
        currentToken = this._parseLiteral();
        break;
    }
    this.currentPosition = this.readCurrentPosition + 1;
    if (currentToken === null) {
      throw new ParseError(
        `Couldn't parse ${currentChar} at position ${this.currentPosition}`,
      );
    }
    return currentToken;
  }

  private _hasNext() {
    return this.input.length > this.currentPosition;
  }

  private _parseLiteral() {
    if (this.inParentheses) {
      while (
        this.input[this.readCurrentPosition] !== ')' &&
        this.readCurrentPosition !== this.input.length
      ) {
        this.readCurrentPosition++;
      }
    } else {
      while (
        this.input[this.readCurrentPosition] !== ' ' &&
        this.input[this.readCurrentPosition] !== '\n' &&
        this.input[this.readCurrentPosition] !== '\r' &&
        this.input[this.readCurrentPosition] !== '\t' &&
        this.input[this.readCurrentPosition] !== ':' &&
        this.input[this.readCurrentPosition] !== '-' &&
        this.input[this.readCurrentPosition] !== '<' &&
        this.input[this.readCurrentPosition] !== '>' &&
        this.input[this.readCurrentPosition] !== '{' &&
        this.input[this.readCurrentPosition] !== '}' &&
        this.input[this.readCurrentPosition] !== '(' &&
        this.input[this.readCurrentPosition] !== ')' &&
        this.readCurrentPosition !== this.input.length
      ) {
        this.readCurrentPosition++;
      }
    }

    const text = this.input.substring(
      this.currentPosition,
      this.readCurrentPosition,
    );
    this.currentPosition = --this.readCurrentPosition;
    if (text === 'status') {
      return {
        type: 'status',
        literal: 'status',
      };
    }
    return {
      type: 'ident',
      literal: text,
    };
  }

  private _skipWhitespace() {
    while (
      this.input[this.currentPosition] === ' ' ||
      this.input[this.currentPosition] === '\n' ||
      this.input[this.currentPosition] === '\r' ||
      this.input[this.currentPosition] === '\t'
    ) {
      this.currentPosition += 1;
    }
  }
}
