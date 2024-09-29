import { describe, expect, test } from 'vitest';
import type { RootAst } from '../parser/ast';
import { Eval } from './eval';

describe('eval', () => {
  test('correctly parse', () => {
    const input: RootAst[] = [
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
      {
        type: 'status',
        indentifier: {
          type: 'identifier',
          value: {
            type: 'textWithoutSpace',
            value: 'Hogehoge2',
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
                  value: 'open',
                },
              },
            },
          ],
        },
      },
      {
        type: 'flow',
        from: {
          type: 'identifier',
          value: {
            type: 'textWithoutSpace',
            value: 'Hogehoge',
          },
        },
        to: {
          type: 'identifier',
          value: {
            type: 'textWithoutSpace',
            value: 'Hogehoge2',
          },
        },
      },
    ];
    const result = {
      statuses: [
        {
          type: 'status',
          name: 'Hogehoge',
          rootStatus: {
            type: 'total',
            value: 'close',
          },
          statuses: [
            {
              type: 'windowStatus',
              value: 'close',
            },
            {
              type: 'doorStatus',
              value: 'close',
            },
          ],
        },
        {
          type: 'status',
          name: 'Hogehoge2',
          rootStatus: {
            type: 'total',
            value: 'close',
          },
          statuses: [
            {
              type: 'windowStatus',
              value: 'close',
            },
            {
              type: 'doorStatus',
              value: 'open',
            },
          ],
        },
      ],
      flows: [
        {
          type: 'flow',
          from: 'Hogehoge',
          to: 'Hogehoge2',
        },
      ],
    };
    const target = new Eval(input);
    expect(target.parseAst()).toEqual(result);
  });

  test('throw error when statuses duplicate', () => {
    const input: RootAst[] = [
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
                  value: 'open',
                },
              },
            },
          ],
        },
      },
      {
        type: 'flow',
        from: {
          type: 'identifier',
          value: {
            type: 'textWithoutSpace',
            value: 'Hogehoge',
          },
        },
        to: {
          type: 'identifier',
          value: {
            type: 'textWithoutSpace',
            value: 'Hogehoge2',
          },
        },
      },
    ];

    const target = new Eval(input);
    expect(() => target.parseAst()).toThrowError(
      'duplicate status name Hogehoge',
    );
  });

  test('throw error when from status is not found', () => {
    const input: RootAst[] = [
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
      {
        type: 'status',
        indentifier: {
          type: 'identifier',
          value: {
            type: 'textWithoutSpace',
            value: 'Hogehoge2',
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
                  value: 'open',
                },
              },
            },
          ],
        },
      },
      {
        type: 'flow',
        from: {
          type: 'identifier',
          value: {
            type: 'textWithoutSpace',
            value: 'Hogehoge3',
          },
        },
        to: {
          type: 'identifier',
          value: {
            type: 'textWithoutSpace',
            value: 'Hogehoge2',
          },
        },
      },
    ];
    const target = new Eval(input);
    expect(() => target.parseAst()).toThrowError(
      'Status Hogehoge3 is not found',
    );
  });

  test('throw error when to status is not found', () => {
    const input: RootAst[] = [
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
      {
        type: 'status',
        indentifier: {
          type: 'identifier',
          value: {
            type: 'textWithoutSpace',
            value: 'Hogehoge2',
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
                  value: 'open',
                },
              },
            },
          ],
        },
      },
      {
        type: 'flow',
        from: {
          type: 'identifier',
          value: {
            type: 'textWithoutSpace',
            value: 'Hogehoge',
          },
        },
        to: {
          type: 'identifier',
          value: {
            type: 'textWithoutSpace',
            value: 'Hogehoge3',
          },
        },
      },
    ];
    const target = new Eval(input);
    expect(() => target.parseAst()).toThrowError(
      'Status Hogehoge3 is not found',
    );
  });
});
