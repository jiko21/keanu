import type { RootAst } from '../parser/ast';

class EvalLangError extends Error {}

type StatusPair = {
  type: string;
  value: string;
};

type Status = {
  type: 'status';
  name: string;
  rootStatus: StatusPair;
  statuses: StatusPair[];
};

type Flow = {
  type: 'flow';
  from: string;
  to: string;
  label: string | undefined;
};

type ParsedObject = Flow | Status;

export class Eval {
  rootAsts: RootAst[];
  statusList: string[];

  constructor(rootAsts: RootAst[]) {
    this.rootAsts = rootAsts;
    this.statusList = [];
  }

  parseAst() {
    const result = {
      statuses: [] as Status[],
      flows: [] as Flow[],
    };
    for (const item of this.rootAsts) {
      const parsedObject = this._parseToObject(item);
      switch (parsedObject.type) {
        case 'status':
          result.statuses.push(parsedObject);
          break;
        case 'flow':
          result.flows.push(parsedObject);
          break;
      }
    }

    // check flow
    const statusList = result.statuses.map((item) => item.name);
    for (const flow of result.flows) {
      if (!statusList.includes(flow.from)) {
        throw new EvalLangError(`Status ${flow.from} is not found.`);
      }
      if (!statusList.includes(flow.to)) {
        throw new EvalLangError(`Status ${flow.to} is not found.`);
      }
    }
    return result;
  }

  private _parseToObject(rootAst: RootAst): ParsedObject {
    switch (rootAst.type) {
      case 'status': {
        const statusName = rootAst.indentifier.value.value;
        if (this.statusList.includes(statusName)) {
          throw new EvalLangError(`duplicate status name ${statusName}`);
        }
        this.statusList.push(statusName);
        return {
          type: 'status',
          name: statusName,
          rootStatus: {
            type: rootAst.statement.indentifier.value.value,
            value: rootAst.statement.value.value.value,
          },
          statuses: rootAst.statements.statements.map((statement) => ({
            type: statement.indentifier.value.value,
            value: statement.value.value.value,
          })),
        };
      }
      case 'flow': {
        const from = rootAst.from.value.value;
        const to = rootAst.to.value.value;
        const label = rootAst.label?.value;
        return {
          type: 'flow',
          from,
          to,
          label,
        };
      }
    }
  }
}
