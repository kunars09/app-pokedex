import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { TrainerProfile } from '@/toolbox/interfaces/trainer';

type StoreState = {
	profile: TrainerProfile | null;
};

const mockStoreState = vi.fn<() => StoreState>();

vi.mock('@/store/trainerStore', () => ({
	useTrainerStore: (selector: (state: StoreState) => unknown) =>
		selector(mockStoreState()),
}));

import { TrainerCard } from './index';

describe('TrainerCard', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should render empty state when no profile exists', () => {
		mockStoreState.mockReturnValue({ profile: null });
		const result = TrainerCard();
		const textChild = result.props.children;
		expect(textChild.props.children).toBe(
			'No hay perfil de entrenador registrado',
		);
	});

	it('should render card when profile exists', () => {
		mockStoreState.mockReturnValue({
			profile: {
				fullName: 'Ash Ketchum',
				age: 10,
				email: 'ash@pokemon.com',
				region: 'Kanto',
				favoritePokemonType: 'fire' as TrainerProfile['favoritePokemonType'],
			},
		});

		const result = TrainerCard();
		expect(result.props.children).toBeDefined();
	});

	it('should display trainer name correctly', () => {
		mockStoreState.mockReturnValue({
			profile: {
				fullName: 'Misty',
				age: 12,
				email: 'misty@pokemon.com',
				region: 'Kanto',
				favoritePokemonType: 'water' as TrainerProfile['favoritePokemonType'],
			},
		});

		const result = TrainerCard();
		const body = result.props.children[1];
		const nameField = body.props.children[0];
		const nameValue = nameField.props.children[1];
		expect(nameValue.props.children).toBe('Misty');
	});

	it('should display trainer age with suffix', () => {
		mockStoreState.mockReturnValue({
			profile: {
				fullName: 'Brock',
				age: 15,
				email: 'brock@pokemon.com',
				region: 'Johto',
				favoritePokemonType: 'rock' as TrainerProfile['favoritePokemonType'],
			},
		});

		const result = TrainerCard();
		const body = result.props.children[1];
		const ageField = body.props.children[1];
		const ageValue = ageField.props.children[1];
		expect(ageValue.props.children).toContain(15);
	});
});
