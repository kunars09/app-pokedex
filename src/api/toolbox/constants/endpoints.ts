export const PokemonApi = {
	PATH_LIST: '/pokemon',
	PATH_DETAIL: (id: string | number) => `/pokemon/${id}`,
} as const;

export const POKEMON_LIST_LIMIT = 20;
