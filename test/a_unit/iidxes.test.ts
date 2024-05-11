/// <reference types="mocha" />
import { iidxes, finalRegex } from "../../src/regex";
import * as expect from "expect";

/**
 * For performance reasons, the capture group numbers metadata (`iidxes`) is
 * pre-generated rather than generated on the fly.
 *
 * When Editing the regular expressions in `src/regex.js`, the regeneration logic
 * for capture group numbers must be re-run before deployment and release.
 *
 * This test ensures the values are kept in sync.
 */
describe("UNIT: iidxes", () => {
	it(
		`iidxes match re-generated version (to fix this, replace the pre-generated iidxes in src/regex.js with the expected test output)`,
		() => {
			expect(iidxes).toStrictEqual(generateIidxes());
		}
	);
});

function generateIidxes() {
	const testers = [
		`file:///some/file/path/filename.pdf`,
		`mailto:e+_mail.me@sub.domain.com`,
		`http://sub.domain.co.uk:3000/p/a/t/h_(asd)/h?q=abc123#dfdf`,
		`http://www.عربي.com`,
		`http://127.0.0.1:3000/p/a/t_(asd)/h?q=abc123#dfdf`,
		`http://[2a00:1450:4025:401::67]/k/something`,
		`a.ta/p`,
		`a@b.cd`,
		`www.github.com/path`,
	];

	const iidxes = {
		isFile: 0,
		file: {
			fileName: 0,
			protocol: 0,
		},
		isEmail: 0,
		email: {
			protocol: 0,
			local: 0,
			host: 0,
		},
		isURL: 0,
		url: {
			TLD: [0, 0],
			protocol: [0, 0],
			host: [0],
			ipv4: 0,
			byProtocol: 0,
			port: 0,
			protocolWithDomain: 0,
			path: 0,
		}
	}

	for (let i = 0; i < testers.length; i++) {
		const element = testers[i];
		const result = finalRegex.exec(element);
		if (result === null) {
			continue;
		}
		if (i === 0) {
			iidxes.isFile = result.lastIndexOf(result[0]);
			iidxes.file.fileName = result.indexOf("filename.pdf");
			iidxes.file.protocol = result.indexOf("file:///");
		}
		if (i === 1) {
			iidxes.isEmail = result.lastIndexOf(result[0]);
			iidxes.email.protocol = result.indexOf("mailto:");
			iidxes.email.local = result.indexOf("e+_mail.me");
			iidxes.email.host = result.indexOf("sub.domain.com");
		}
		if (i === 2) {
			iidxes.isURL = result.lastIndexOf(result[0]);
			iidxes.url.protocol[0] = result.indexOf("http://");
			iidxes.url.protocolWithDomain = result.indexOf(
				"http://sub.domain.co.uk:3000"
			);
			iidxes.url.port = result.indexOf("3000");
			iidxes.url.path = result.indexOf("/p/a/t/h_(asd)/h?q=abc123#dfdf");
		}
		if (i === 3) {
			iidxes.url.byProtocol = result.lastIndexOf("http://www.عربي.com");
		}
		if (i === 4) {
			iidxes.url.ipv4 = result.lastIndexOf("127.0.0.1");
		}
		if (i === 5) {
			iidxes.url.protocol[1] = result.lastIndexOf("http://");
		}
		if (i === 6) {
			iidxes.url.TLD[0] = result.indexOf("ta");
		}
		if (i === 7) {
			iidxes.url.TLD[1] = result.indexOf("cd");
		}
		if (i === 8) {
			iidxes.url.host[0] = result.lastIndexOf("www.github.com");
		}
		finalRegex.lastIndex = 0;
	}

	return iidxes;
}
