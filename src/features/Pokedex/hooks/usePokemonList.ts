import { useInfiniteQuery } from '@tanstack/react-query';

import { usePokemonService } from '@/api/services';

export const usePokemonList = () => {
	const { fetchPokemonList } = usePokemonService();

	return useInfiniteQuery({
		queryKey: ['pokemon', 'list'],
		queryFn: ({ pageParam = 0 }) => fetchPokemonList(pageParam),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			if (!lastPage.next) return undefined;
			const url = new URL(lastPage.next);
			const offset = url.searchParams.get('offset');
			return offset ? Number(offset) : undefined;
		},
	});
};
