/// <reference types="mocha" />
import anchorme from "../../src/index";
import * as expect from "expect";

describe("UNIT: groups", () => {
	it("groups", () => {
		const matches = anchorme.list(
			"https://example.xyz example.com user@email.com file:///filename.txt 192.168.1.1",
			false,
		);

		const expected = [
			{
				start: 0,
				end: 19,
				string: "https://example.xyz",
				isURL: true,
				protocol: "https://",
				host: "example.xyz",
				confirmedByProtocol: true,
				reason: "url",
			},
			{
				start: 20,
				end: 31,
				string: "example.com",
				isURL: true,
				host: "example.com",
				confirmedByProtocol: false,
				reason: "url",
			},
			{
				start: 32,
				end: 46,
				string: "user@email.com",
				isEmail: true,
				local: "user",
				host: "email.com",
				reason: "email",
			},
			{
				start: 47,
				end: 67,
				string: "file:///filename.txt",
				isFile: true,
				protocol: "file:///",
				filename: "filename.txt",
				filePath: "filename.txt",
				fileDirectory: "",
				reason: "file",
			},
			{
				start: 68,
				end: 79,
				string: "192.168.1.1",
				isURL: true,
				ipv4: "192.168.1.1",
				host: "192.168.1.1",
				confirmedByProtocol: false,
				reason: "url",
			},
		];

		expect(matches).toEqual(expected);

		for (const match of matches) {
			switch (match.reason) {
				case "email": {
					expect(match.isEmail).toBe(true);
					expect(match.isFile).toBeFalsy();
					expect(match.isURL).toBeFalsy();

					// ts
					match.protocol;
					match.local;
					match.host;
					expect(match).toHaveProperty("protocol");
					expect(match).toHaveProperty("local");
					expect(match).toHaveProperty("host");

					// @ts-expect-error
					match.filename;
					expect(match).not.toHaveProperty("filename");

					break;
				}
				case "file": {
					expect(match.isFile).toBe(true);
					expect(match.isEmail).toBeFalsy();
					expect(match.isURL).toBeFalsy();

					// ts
					match.protocol;
					match.filename;
					match.filePath;
					match.fileDirectory;
					expect(match).toHaveProperty("protocol");
					expect(match).toHaveProperty("filename");
					expect(match).toHaveProperty("filePath");
					expect(match).toHaveProperty("fileDirectory");

					// @ts-expect-error
					match.fragment;
					expect(match).not.toHaveProperty("fragment");

					break;
				}
				case "url": {
					expect(match.isURL).toBe(true);
					expect(match.isEmail).toBeFalsy();
					expect(match.isFile).toBeFalsy();

					// ts
					match.protocol;
					match.host;
					match.port;
					match.ipv4;
					match.ipv6;
					match.confirmedByProtocol;
					match.path;
					match.query;
					match.fragment;
					expect(match).toHaveProperty("protocol");
					expect(match).toHaveProperty("host");
					expect(match).toHaveProperty("port");
					expect(match).toHaveProperty("ipv4");
					expect(match).toHaveProperty("ipv6");
					expect(match).toHaveProperty("confirmedByProtocol");
					expect(match).toHaveProperty("path");
					expect(match).toHaveProperty("query");
					expect(match).toHaveProperty("fragment");

					// @ts-expect-error
					match.local;
					expect(match).not.toHaveProperty("local");

					break;
				}
				default: {
					throw new Error("Unreachable");
				}
			}
		}
	});
});
