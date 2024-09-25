export type Status = {
  type: 'status';
  indentifier: Identifier;
  statement: Statement;
  statements: Statements;
};

export type Statements = {
  type: 'statements';
  statements: Statement[];
};

export type Statement = {
  type: 'statement';
  indentifier: Identifier;
  value: Value;
};

export type TextWithoutSpace = {
  type: 'textWithoutSpace';
  value: string;
};

export type TextWithSpace = {
  type: 'textWithSpace';
  value: string;
};

export type Identifier = {
  type: 'identifier';
  value: TextWithoutSpace;
};

export type Value = {
  type: 'value';
  value: TextWithoutSpace;
};

export type Flow = {
  type: 'flow';
  from: Identifier;
  to: Identifier;
  label?: TextWithSpace;
};

export type BaseAst =
  | Status
  | Statements
  | Statement
  | TextWithoutSpace
  | TextWithSpace
  | Identifier
  | Value
  | Flow;

export type RootAst = Status | Flow;
