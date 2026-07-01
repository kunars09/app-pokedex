import type { PokemonType } from '../enums';

export interface TrainerProfile {
	fullName: string;
	age: number;
	email: string;
	region: string;
	favoritePokemonType: PokemonType;
}
