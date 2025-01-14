import { nonLatinAlphabetRanges } from "./dictionary";

const emailAddress = "([\\w!#$%&'*+=?^`{|}~-]+(?:\\.[\\w!#$%&'*+=?^`{|}~-]+)*)";
const domain = `(?:(?:(?:[a-z\\d]|[a-z\\d][\\w\\-]*[a-z\\d]))\\.)+(xn--[a-z\\d]{2,}|[a-z]{2,})(?=[^.]|\\b)`;
const allowedInPath = `\\w\\-.~\\!$&*+,;=:@%'"\\[\\]()?#`;
const path = `((?:\/|\\?)(?:([${allowedInPath}${nonLatinAlphabetRanges}\\/](?:[\\w\\-~+=#&\\/${nonLatinAlphabetRanges}]|\\b)+)*)+)`;
const ipv4 = `((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?))`;
const ipv6 = `\\[(?:(?:[a-f\\d:]+:+)+[a-f\\d]+)\\]`;
const port = `(:(\\d{1,5}))?`;
const protocol = `(ht{2}ps?:|ftps?:)\\/\\/`;
const confirmedByProtocol = `(${protocol})\\S+\\b`;
const fqdn = `(((${protocol})?(${domain}|${ipv4})(?=\\b|_)${port})|(?:${confirmedByProtocol}))`;

export const email = `\\b(mailto:)?${emailAddress}@(${domain}|${ipv4})`;
export const url = `(${fqdn})${path}?`;
export const file = `(file:\\/\\/\\/)(?:[a-z]+:(?:\\/|\\\\)+)?([\\w.]+(?:[\\/\\\\]?)+)+`;

// since safari doesn't like lookbehind, we're trying an alternative
export const final1 = `(?<=\\b|_)((${email})|(${file})|(${url}))(\\b)?`;
export const final2 = `((\\b)(${email})|(\\b)(${file})|(\\b)(${url}))(\\b)?`;

export let finalRegex = new RegExp(final2, "gi");
try {
	finalRegex = new RegExp(final1, "gi");
} catch (e) {
	finalRegex = new RegExp(final2, "gi");
}

// for validation purposes
export const ipRegex = new RegExp(`^(${ipv4}|${ipv6})$`, "i");
export const emailRegex = new RegExp(`^(${email})$`, "i");
export const fileRegex = new RegExp(`^(${file})$`, "i");
export const urlRegex = new RegExp(`^(${url})$`, "i");

// identifying parts of the link
// the initial value of this object is precomputed.
// https://github.com/alexcorvi/anchorme.js/blob/098843bc0d042601cff592c4f8c9f6d0424c09cd/src/regex.ts
const iidxes = {"isFile":8,"file":{"fileName":10,"protocol":9},"isEmail":2,"email":{"protocol":3,"local":4,"host":5},"isURL":11,"url":{"TLD":[18,6],"protocol":[15,22],"host":[17],"ipv4":19,"byProtocol":13,"port":21,"protocolWithDomain":12,"path":24}};


/***
 * When Editing the regular expressions above the code below must be run
 * Before deployment and release the iidexes in console log must be copied to the object above
 *  --------------------------------


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


for (let i = 0; i < testers.length; i++) {
	const element = testers[i];
	const result = finalRegex.exec(element);
	if(result === null) {
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
	if (i ===6) {
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

console.log(JSON.stringify(iidxes));
*/

export { iidxes };