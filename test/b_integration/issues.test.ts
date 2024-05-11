/// <reference types="mocha" />
import anchorme from "../../dist/node/index";
import * as expect from "expect";
describe("Issues", () => {
	/**
	 * Testing to verify that the issues
	 * submitted by the library users are solved
	 */

	it("Emojis", () => {
		expect(anchorme.list("http://www.🍕💩.ws").length).toBe(1);
	});
	it("Preserve casing", () => {
		expect(anchorme("codepen.io/sdthornton/pen/wBZdXq")).toBe(
			`<a href="http://codepen.io/sdthornton/pen/wBZdXq">codepen.io/sdthornton/pen/wBZdXq</a>`
		);
	});
	it("Ending with a period doesn't break the URL", () => {
		const str = anchorme.list("This is a link http://www.🍕💩.ws.")[0]
			.string;
		expect(str.charAt(str.length - 1)).toBe("s");
	});
	it("Percent encoding doesn't break the URL", () => {
		expect(anchorme("https://mydomain.com/My%20document.pdf")).toBe(
			`<a href="https://mydomain.com/My%20document.pdf">https://mydomain.com/My%20document.pdf</a>`
		);
	});
	it("Anchor tags aren't included", () => {
		expect(
			anchorme.list(`in this paragraph <a href="http://www.google.com">http://www.google.com</a> all links
        are <a
        href="http://www.google.com">http://www.google.com
        </a> already inside anchor`).length
		).toBe(0);
	});
	it("Quotes surrounding", () => {
		const res = anchorme.list(`For example,
        it identifies (www.google.com) and [[www.google.com]] no
        problem but doesn't seem to parse "www.google.com" or
        'www.google.com' correctly.
        Not sure if I am doing something wrong.`);
		expect(res.filter(x => x.string === "www.google.com").length).toBe(
			res.length
		);
	});

	it("parenthesis surrounding", () => {
		const res = anchorme.list(`Not converted:
        "Do a search (go here: google.com)"
        Converted (added an extra space after google.com):
        "Do a search (go here: google.com )"`);
		expect(res.filter(x => x.string === "google.com").length).toBe(
			res.length
		);
	});

	it("local machines", () => {
		const res = anchorme.list(
			`http://localhost localhost http://local http://machine`
		);
		expect(res.map((x) => x.string)).toStrictEqual([
			'http://localhost',
			'http://local',
			'http://machine',
		]);
	});

	it("Link after emoji", () => {
		const res = anchorme(
			`What's the best way to clean your smartphone? 📱🚿https://t.co/cxjsA6j60J`
		);
		expect(res).toBe(
			`What's the best way to clean your smartphone? 📱🚿<a href="https://t.co/cxjsA6j60J">https://t.co/cxjsA6j60J</a>`
		);
	});

	describe("localhost with port - https://github.com/alexcorvi/anchorme.js/issues/119", () => {
		it("localhost with port", () => {
			const res = anchorme.list(`
				http://localhost:80
				http://local:6666/
				https://localhost:443/a/b?c=d"
			`);

			expect(res.map((x) => x.string)).toStrictEqual([
				'http://localhost:80',
				'http://local:6666/',
				'https://localhost:443/a/b?c=d',
			]);
		});

		describe("within HTML attributes", () => {
			const input = `
				<a href="http://localhost:80"></a>
				<a href="http://local:6666/"></a>
				<a href="https://localhost:443/a/b?c=d"></a>

				<a href='http://localhost:80'></a>
				<a href='http://local:6666/'></a>
				<a href='https://localhost:443/a/b?c=d'></a>

				<a href=http://localhost:80></a>
				<a href=http://local:6666/></a>
				<a href=https://localhost:443/a/b?c=d></a>
			`;

			it('no results with skipHTML=true', () => {
				const res = anchorme.list(input, true);
				expect(res.map((x) => x.string)).toStrictEqual([]);
			});

			it('only the attribute values with skipHTML=false', () => {
				const res = anchorme.list(input, false);
				expect(res.map((x) => x.string)).toStrictEqual([
					'http://localhost:80',
					'http://local:6666/',
					'https://localhost:443/a/b?c=d',
					'http://localhost:80',
					'http://local:6666/',
					'https://localhost:443/a/b?c=d',
					'http://localhost:80',
					'http://local:6666/',
					'https://localhost:443/a/b?c=d',
				]);
			});
		});
	});
});
