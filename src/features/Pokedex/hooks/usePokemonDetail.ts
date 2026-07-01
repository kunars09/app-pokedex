import { useQuery } from '@tanstack/react-query';

import { usePokemonService } from '@/api/services';

export const usePokemonDetail = (id: number | string) => {
	const { fetchPokemonDetail } = usePokemonService();

	return useQuery({
		queryKey: ['pokemon', 'detail', id],
		queryFn: () => fetchPokemonDetail(id),
		enabled: !!id,
	});
};
