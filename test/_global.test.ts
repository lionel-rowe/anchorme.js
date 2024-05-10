// @ts-ignore
const { SIMULATE_NO_LOOKBEHIND } = process.env;

if (SIMULATE_NO_LOOKBEHIND) {
	const OriginalRegExp = globalThis.RegExp;

	class MockRegExp extends OriginalRegExp {
		constructor(pattern: string | RegExp, flags?: string) {
			super(pattern, flags)
			if (String(pattern).includes('(?<=')) {
				throw new SyntaxError('idk what (?<= even means')
			}
		}
	}

	// @ts-ignore
	globalThis.RegExp = MockRegExp;
}

import { NO_LOOKBEHIND_COMPAT_MODE } from '../src/regex';

if (NO_LOOKBEHIND_COMPAT_MODE !== Boolean(SIMULATE_NO_LOOKBEHIND)) {
	throw new Error('Failed to set `NO_LOOKBEHIND_COMPAT_MODE` correctly.');
}
