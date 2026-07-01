import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { PokemonDetailCard } from '@/features/Pokedex/components/PokemonDetailCard';
import { COLORS } from '@/styles';

export default function PokemonDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();

	return (
		<View style={styles.container}>
			<PokemonDetailCard id={Number(id)} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
});
