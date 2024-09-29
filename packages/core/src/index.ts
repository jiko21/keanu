import { Eval } from './eval/eval';
import { Lexer } from './lexer';
import { Parser } from './parser/parser';

export class LangCore {
  textInput: string;

  constructor(textInput: string) {
    this.textInput = textInput;
  }

  parse() {
    const lexer = new Lexer(this.textInput);
    const tokens = lexer.parseToTokens();
    const parser = new Parser(tokens);
    const asts = parser.parse();
    const evaluator = new Eval(asts);
    return evaluator.parseAst();
  }
}
