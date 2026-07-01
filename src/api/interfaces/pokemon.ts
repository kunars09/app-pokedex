export type PokemonListItem = {
	name: string;
	url: string;
};

export type PokemonListResponse = {
	count: number;
	next: string | null;
	previous: string | null;
	results: PokemonListItem[];
};

export type PokemonStat = {
	base_stat: number;
	effort: number;
	stat: {
		name: string;
		url: string;
	};
};

export type PokemonTypeInfo = {
	slot: number;
	type: {
		name: string;
		url: string;
	};
};

export type PokemonSprites = {
	front_default: string | null;
	other: {
		'official-artwork': {
			front_default: string | null;
		};
	};
};

export type PokemonDetail = {
	id: number;
	name: string;
	height: number;
	weight: number;
	sprites: PokemonSprites;
	stats: PokemonStat[];
	types: PokemonTypeInfo[];
};
