import { describe, expect, it, vi } from 'vitest';

import type { PokemonListResponse } from '@/api/interfaces';

type InfiniteQueryOptions = {
	queryKey: string[];
	queryFn: (ctx: { pageParam: number }) => Promise<PokemonListResponse>;
	initialPageParam: number;
	getNextPageParam: (lastPage: PokemonListResponse) => number | undefined;
};

vi.mock('@tanstack/react-query', () => ({
	useInfiniteQuery: vi.fn((options: InfiniteQueryOptions) => ({
		queryKey: options.queryKey,
		queryFn: options.queryFn,
		getNextPageParam: options.getNextPageParam,
	})),
}));

vi.mock('@/api/services', () => ({
	usePokemonService: () => ({
		fetchPokemonList: vi.fn(),
		fetchPokemonDetail: vi.fn(),
	}),
}));

import { usePokemonList } from '../usePokemonList';

describe('usePokemonList', () => {
	it('should use correct query key', () => {
		const result = usePokemonList() as unknown as InfiniteQueryOptions;
		expect(result.queryKey).toEqual(['pokemon', 'list']);
	});

	it('should return offset from next URL in getNextPageParam', () => {
		const result = usePokemonList() as unknown as InfiniteQueryOptions;
		const nextPage = result.getNextPageParam({
			count: 100,
			next: 'https://pokeapi.co/api/v2/pokemon?offset=40&limit=20',
			previous: null,
			results: [],
		});
		expect(nextPage).toBe(40);
	});

	it('should return undefined when no next page exists', () => {
		const result = usePokemonList() as unknown as InfiniteQueryOptions;
		const nextPage = result.getNextPageParam({
			count: 100,
			next: null,
			previous: null,
			results: [],
		});
		expect(nextPage).toBeUndefined();
	});
});
