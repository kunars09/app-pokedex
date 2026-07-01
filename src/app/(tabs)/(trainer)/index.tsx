import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { TrainerCard } from '@/features/Trainer/components/TrainerCard';
import { useTrainerStore } from '@/store';
import { COLORS, SPACING } from '@/styles';

export default function TrainerIndexScreen() {
	const router = useRouter();
	const profile = useTrainerStore((state) => state.profile);

	return (
		<View style={styles.container}>
			{profile ? (
				<TrainerCard />
			) : (
				<View style={styles.emptyState}>
					<Ionicons
						name="person-circle-outline"
						size={80}
						color={COLORS.gray400}
					/>
					<Text style={styles.title}>Perfil de Entrenador</Text>
					<Text style={styles.subtitle}>
						Registra tu carnet de entrenador para empezar tu aventura Pokémon.
					</Text>
				</View>
			)}

			<View style={styles.buttonContainer}>
				<Button
					title={profile ? 'Editar Perfil' : 'Registrar Entrenador'}
					onPress={() => router.push('/(tabs)/(trainer)/step-one')}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.surface,
	},
	emptyState: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: SPACING.xl,
		gap: SPACING.md,
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
		color: COLORS.black,
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 16,
		color: COLORS.gray500,
		textAlign: 'center',
		lineHeight: 22,
	},
	buttonContainer: {
		padding: SPACING.xl,
	},
});
