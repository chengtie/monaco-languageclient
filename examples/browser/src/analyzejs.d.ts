interface ISignatureInfo {
    /**
     * line number (starts at 1)
     */
    readonly name?: string;
    /**
     * column (the first character in a line is between column 1 and column 2)
     */
    readonly index?: number;
}

declare function getSignatureInfo(s: string, offset: number): ISignatureInfo;

declare function parseStringOneLineNewWs(s: string): string;

declare function parseStringMultiLinesNewWs(s: string): string;

declare function formatFormula(s: string, width_limit?: number): string;

declare function getFormatWidthLimit(s: string, base?: number): number;

declare function unformatFormula(s: string): string;

declare function verifyOCaml(usedRangeAsOCaml: any): any;

declare function getBlocksUnit(worksheetsOCaml: any, usedRangeAsOCaml: any): any;

declare function coFromString(address: string): string;

declare function checkFormula(s: string, rangeMode: string): any;
