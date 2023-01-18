import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { supabaseClient } = await getSupabase(event);
	const { data: cars, error } = await supabaseClient.from('cars').select('*');

	if (!cars) {
		return {
			status: 500,
			body: error.message
		};
	}

	return {
		cars
	};
}) satisfies PageLoad;
