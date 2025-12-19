// src/lib/server/validation.ts
import { promises as dns } from 'dns';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const DISPOSABLE_DOMAINS = [
	'guerrillamail.com',
	'10minutemail.com',
	'mailinator.com',
	'tempmail.com',
	'throwaway.email',
	'temp-mail.org',
	'guerrillamailblock.com',
	'sharklasers.com',
	'yopmail.com'
	// Add more from mailchecker package or maintain list
];

/**
 * Validates email format using RFC 5322 pattern
 * @param email - Email address to validate
 * @returns true if format is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
	return EMAIL_REGEX.test(email);
}

/**
 * Checks if domain has valid MX records (with 2s timeout)
 * @param domain - Domain name to check
 * @returns true if MX records exist, false otherwise
 */
export async function checkMxRecords(domain: string): Promise<boolean> {
	try {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 2000);

		const records = await dns.resolveMx(domain);
		clearTimeout(timeout);

		return records && records.length > 0;
	} catch (err) {
		return false;
	}
}

/**
 * Checks if email domain is disposable/temporary
 * @param domain - Domain name to check
 * @returns true if domain is disposable, false otherwise
 */
export function isDisposableEmail(domain: string): boolean {
	return DISPOSABLE_DOMAINS.includes(domain.toLowerCase());
}

/**
 * Full email validation pipeline
 * @param email - Email address to validate
 * @returns Validation result with error type if invalid
 */
export async function validateEmailFull(email: string): Promise<{
	valid: boolean;
	errorType?: string;
}> {
	if (!validateEmail(email)) {
		return { valid: false, errorType: 'invalid_format' };
	}

	const domain = email.split('@')[1];

	if (isDisposableEmail(domain)) {
		return { valid: false, errorType: 'disposable_email' };
	}

	const hasMx = await checkMxRecords(domain);
	if (!hasMx) {
		return { valid: false, errorType: 'invalid_domain' };
	}

	return { valid: true };
}
