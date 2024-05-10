export interface BaseTokenProps {
	start: number;
	end: number;
	string: string;
}

export interface Email extends BaseTokenProps {
	reason: "email";
	isEmail: true;
	isURL?: false;
	isFile?: false;
	protocol?: string;
	local: string;
	host: string;
}

export interface URL extends BaseTokenProps {
	reason: "url";
	isURL: true;
	isEmail?: false;
	isFile?: false;
	protocol?: string;
	host?: string;
	port?: string;
	ipv4?: string;
	ipv6?: string;
	confirmedByProtocol: boolean;
	path?: string;
	query?: string;
	fragment?: string;
}

export interface File extends BaseTokenProps {
	reason: "file";
	isFile: true;
	isURL?: false;
	isEmail?: false;
	protocol: string;
	filename?: string;
	filePath: string;
	fileDirectory?: string;
}

export type ListingProps = Email | File | URL;

export type DesiredValues =
	| { [key: string]: string | undefined | true }
	| number
	| string
	| boolean;

export type TransformationOption<desiredValue> =
	| desiredValue
	| ((
			string: string,
			props: Partial<ListingProps> & { string: string }
	  ) => desiredValue);

export interface Options {
	specialTransform: {
		test: RegExp;
		transform: (
			input: string,
			props: Partial<ListingProps> & { string: string }
		) => string;
	}[];
	skipHTML?: boolean;
	protocol: TransformationOption<string>;
	truncate: TransformationOption<number>;
	middleTruncation: TransformationOption<boolean>;
	exclude: TransformationOption<boolean>;
	attributes: TransformationOption<{
		[key: string]: string | undefined | true;
	}>;
}
