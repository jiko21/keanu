import type { Token } from '../token';
import type { Statement } from './ast';
import { ParserError } from './error';

export function parseStatement(
  tokens: Token[],
  currentIndex: number,
): {
  statement: Statement;
  currentReadIndex: number;
} {
  let currentReadIndex = currentIndex;
  const identifier = tokens[currentReadIndex++];
  if (identifier.type !== 'ident') {
    throw new ParserError(
      `${JSON.stringify(identifier)} should be identifier.`,
    );
  }
  const colon = tokens[currentReadIndex++];
  if (colon.type !== 'colon') {
    throw new ParserError(`${JSON.stringify(colon)} should be ":".`);
  }
  const value = tokens[currentReadIndex++];
  if (value.type !== 'ident') {
    throw new ParserError(`${JSON.stringify(value)} should be identifier.`);
  }
  return {
    statement: {
      type: 'statement',
      indentifier: {
        type: 'identifier',
        value: {
          type: 'textWithoutSpace',
          value: identifier.literal,
        },
      },
      value: {
        type: 'value',
        value: {
          type: 'textWithoutSpace',
          value: value.literal,
        },
      },
    },
    currentReadIndex,
  };
}
