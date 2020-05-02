import { TextDocument, FormattingOptions, TextEdit, Range } from "vscode-languageserver";
import { Position } from "vscode-languageserver-types";

export class FormulaLanguageService {
    format(document: TextDocument, range: Range, options: FormattingOptions): TextEdit[] {
        let edits = [];
        edits.push(TextEdit.del(range));
        //@ts-ignore
        let t = formatFormula(document.getText())();
        edits.push(TextEdit.insert(Position.create(0, 0), t));
        return edits;
    }

}