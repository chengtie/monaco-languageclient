/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { TextDocument } from "vscode-json-languageservice";
import { MonacoToProtocolConverter, ProtocolToMonacoConverter } from 'monaco-languageclient/lib/monaco-converter';
import { FormulaLanguageService } from './formula-language-server';

const LANGUAGE_ID = 'formula';
const MODEL_URI = 'inmemory://model.json'
const MONACO_URI = monaco.Uri.parse(MODEL_URI);

// register the JSON language with Monaco
monaco.languages.register({
    id: LANGUAGE_ID,
    extensions: [],
    aliases: [],
    mimetypes: [],
});

// create the Monaco editor
const value = `{
    "$schema": "http://json.schemastore.org/coffeelint",
    "line_endings": "unix"
}`;
monaco.editor.create(document.getElementById("container")!, {
    model: monaco.editor.createModel(value, LANGUAGE_ID, MONACO_URI),
    glyphMargin: true,
    lightbulb: {
        enabled: true
    }
});

function createDocument(model: monaco.editor.IReadOnlyModel) {
    return TextDocument.create(MODEL_URI, model.getModeId(), model.getVersionId(), model.getValue());
}

const m2p = new MonacoToProtocolConverter();
const p2m = new ProtocolToMonacoConverter();
let formulaLanguageService = new FormulaLanguageService();
monaco.languages.registerDocumentRangeFormattingEditProvider(LANGUAGE_ID, {
    provideDocumentRangeFormattingEdits(model, range, options, token): monaco.languages.TextEdit[] | monaco.Thenable<monaco.languages.TextEdit[]> {

        const document = createDocument(model);
        const edits = formulaLanguageService.format(document, m2p.asRange(range), m2p.asFormattingOptions(options));
        return p2m.asTextEdits(edits)
    }
});


