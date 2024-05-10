const OriginalRegExp = globalThis.RegExp;

// Mock RegExp constructor used in tests to ensure regexes contain no lookbehind syntax
class SafariRegExp extends OriginalRegExp {
	constructor(pattern: string | RegExp, flags?: string) {
		super(pattern, flags);
		if (String(pattern).includes("(?<=")) {
			throw new SyntaxError("Lookbehind syntax (?<=...) is disallowed to support legacy Safari");
		}
	}
}

// @ts-ignore
globalThis.RegExp = SafariRegExp;
