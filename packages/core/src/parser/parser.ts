import type { Token } from '../token';
import type { RootAst, Statement, Statements, Status } from './ast';
import { ParserError } from './error';
import { parseStatement } from './statementParser';

export class Parser {
  tokens: Token[];
  currentIndex: number;
  currentReadIndex: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.currentIndex = 0;
    this.currentReadIndex = 0;
  }

  parse(): RootAst[] {
    const result = [];
    while (this._hasNext()) {
      result.push(this._parse());
    }
    return result;
  }

  private _parse(): RootAst {
    const currentToken = this.tokens[this.currentIndex];
    let ast: RootAst | null = null;
    switch (currentToken.type) {
      case 'status':
        ast = this._parseStatus();
        break;
    }
    this.currentIndex = this.currentReadIndex;
    if (ast === null) {
      throw new ParserError('could not parse correctly');
    }
    return ast;
  }

  private _parseStatus(): Status {
    this.currentReadIndex = this.currentIndex + 1;
    const statusName = this.tokens[this.currentReadIndex++];
    if (statusName.type !== 'ident') {
      throw new ParserError(
        `${JSON.stringify(statusName)} should be identifier.`,
      );
    }
    const leftAngelBracket = this.tokens[this.currentReadIndex++];
    if (leftAngelBracket.type !== 'leftAngelBracket') {
      throw new ParserError(
        `${JSON.stringify(leftAngelBracket)} should be "<".`,
      );
    }
    const statement = this._parseStatement();

    const rightAngelBracket = this.tokens[this.currentReadIndex++];
    if (rightAngelBracket.type !== 'rightAngelBracket') {
      throw new ParserError(
        `${JSON.stringify(rightAngelBracket)} should be ">".`,
      );
    }

    const leftBrace = this.tokens[this.currentReadIndex++];
    if (leftBrace.type !== 'leftBrace') {
      throw new ParserError(`${JSON.stringify(leftBrace)} should be "{".`);
    }
    const statements = this._parseStatements();
    const rightBrace = this.tokens[this.currentReadIndex++];
    if (rightBrace.type !== 'rightBrace') {
      throw new ParserError(`${JSON.stringify(rightBrace)} should be "}".`);
    }

    return {
      type: 'status',
      indentifier: {
        type: 'identifier',
        value: {
          type: 'textWithoutSpace',
          value: statusName.literal,
        },
      },
      statement,
      statements,
    };
  }

  private _parseStatements(): Statements {
    const results = [];
    while (this.tokens[this.currentReadIndex].type === 'ident') {
      results.push(this._parseStatement());
    }
    return {
      type: 'statements',
      statements: results,
    };
  }

  private _parseStatement(): Statement {
    const result = parseStatement(this.tokens, this.currentReadIndex);
    this.currentReadIndex = result.currentReadIndex;
    return result.statement;
  }

  private _hasNext() {
    return this.currentIndex < this.tokens.length;
  }
}
