// src/routes/api/health/+server.ts
import { json, type RequestHandler } from '@sveltejs/kit';
import { getHealthStatus } from '$lib/server/health';

/**
 * GET /api/health
 * Returns current email service health status
 */
export const GET: RequestHandler = async () => {
	const health = await getHealthStatus();
	return json(health);
};
