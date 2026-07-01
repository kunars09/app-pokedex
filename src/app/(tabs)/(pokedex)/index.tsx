import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { PokemonList } from '@/features/Pokedex/components/PokemonList';
import { COLORS } from '@/styles';

export default function PokedexScreen() {
	const router = useRouter();

	const handlePokemonPress = (id: number) => {
		router.push({
			pathname: '/(tabs)/(pokedex)/[id]',
			params: { id: String(id) },
		});
	};

	return (
		<View style={styles.container}>
			<PokemonList onPokemonPress={handlePokemonPress} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.surface,
	},
});
