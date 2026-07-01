import { describe, expect, it, vi } from 'vitest';

import type { PokemonDetail } from '@/api/interfaces';

type QueryOptions = {
	queryKey: (string | number)[];
	queryFn: () => Promise<PokemonDetail>;
	enabled: boolean;
};

vi.mock('@tanstack/react-query', () => ({
	useQuery: vi.fn((options: QueryOptions) => ({
		queryKey: options.queryKey,
		queryFn: options.queryFn,
		enabled: options.enabled,
	})),
}));

vi.mock('@/api/services', () => ({
	usePokemonService: () => ({
		fetchPokemonList: vi.fn(),
		fetchPokemonDetail: vi.fn(),
	}),
}));

import { usePokemonDetail } from '../usePokemonDetail';

describe('usePokemonDetail', () => {
	it('should use correct query key with numeric id', () => {
		const result = usePokemonDetail(25) as unknown as QueryOptions;
		expect(result.queryKey).toEqual(['pokemon', 'detail', 25]);
	});

	it('should be enabled when id is truthy', () => {
		const result = usePokemonDetail(1) as unknown as QueryOptions;
		expect(result.enabled).toBe(true);
	});

	it('should be disabled when id is 0', () => {
		const result = usePokemonDetail(0) as unknown as QueryOptions;
		expect(result.enabled).toBe(false);
	});

	it('should accept string id', () => {
		const result = usePokemonDetail('pikachu') as unknown as QueryOptions;
		expect(result.queryKey).toEqual(['pokemon', 'detail', 'pikachu']);
		expect(result.enabled).toBe(true);
	});
});
