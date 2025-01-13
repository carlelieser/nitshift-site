export interface User {
	id: string;
	email: string;
	license: string;
	trialAvailability: boolean;
	trialStartDate: number | null;
}

export interface License {
	issuedOn: Date;
	code: string;
}

export interface Session {
	userId: string;
	expires: number;
}

export interface VerificationCode {
	code: string;
	expires: number;
}
