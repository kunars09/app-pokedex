import type { PokemonDetail, PokemonListResponse } from '../interfaces';

import { API } from '../base';
import { POKEMON_LIST_LIMIT, PokemonApi } from '../toolbox/constants';

export const usePokemonService = () => {
	const fetchPokemonList = async (
		offset: number = 0,
	): Promise<PokemonListResponse> => {
		const response = await API.get<PokemonListResponse>(
			`${PokemonApi.PATH_LIST}?limit=${POKEMON_LIST_LIMIT}&offset=${offset}`,
		);
		return response;
	};

	const fetchPokemonDetail = async (
		id: string | number,
	): Promise<PokemonDetail> => {
		const response = await API.get<PokemonDetail>(PokemonApi.PATH_DETAIL(id));
		return response;
	};

	return {
		fetchPokemonList,
		fetchPokemonDetail,
	};
};
