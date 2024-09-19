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

export type Identifier = {
  type: 'identifier';
  value: TextWithoutSpace;
};

export type Value = {
  type: 'value';
  value: TextWithoutSpace;
};

export type BaseAst =
  | Status
  | Statements
  | Statement
  | TextWithoutSpace
  | Identifier
  | Value;

export type RootAst = Status;
