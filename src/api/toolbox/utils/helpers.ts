export const getPokemonIdFromUrl = (url: string): number => {
	const segments = url.split('/').filter(Boolean);
	return Number(segments[segments.length - 1]);
};

export const getPokemonImageUrl = (id: number): string => {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};
