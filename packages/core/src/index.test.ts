import { describe, expect, test } from 'vitest';
import { LangCore } from '.';

describe('LangCore', () => {
  test('correctly parse', () => {
    const input = `status Hogehoge<total: close> {
	windowStatus: close
	doorStatus: close
}

status Hogehoge2<total: close> {
	windowStatus: close
	doorStatus: open
}

status Hogehoge3<total: close> {
	windowStatus: open
	doorStatus: close
}

status Hogehoge4<total: open> {
	windowStatus: open
	doorStatus: open
}


Hogehoge --(open door)--> Hogehoge2
Hogehoge -(open window)-> Hogehoge3
Hogehoge2 -(open window)-> Hogehoge4
Hogehoge3 -(open door)-> Hogehoge4`;
    const langCore = new LangCore(input);
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
        {
          type: 'status',
          name: 'Hogehoge3',
          rootStatus: {
            type: 'total',
            value: 'close',
          },
          statuses: [
            {
              type: 'windowStatus',
              value: 'open',
            },
            {
              type: 'doorStatus',
              value: 'close',
            },
          ],
        },
        {
          type: 'status',
          name: 'Hogehoge4',
          rootStatus: {
            type: 'total',
            value: 'open',
          },
          statuses: [
            {
              type: 'windowStatus',
              value: 'open',
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
          label: 'open door',
        },
        {
          type: 'flow',
          from: 'Hogehoge',
          to: 'Hogehoge3',
          label: 'open window',
        },
        {
          type: 'flow',
          from: 'Hogehoge2',
          to: 'Hogehoge4',
          label: 'open window',
        },
        {
          type: 'flow',
          from: 'Hogehoge3',
          to: 'Hogehoge4',
          label: 'open door',
        },
      ],
    };
    expect(langCore.parse()).toEqual(result);
  });
});
