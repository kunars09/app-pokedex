import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { TrainerCard } from '@/features/Trainer/components/TrainerCard';
import { COLORS, SPACING } from '@/styles';

export default function SummaryScreen() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<View style={styles.cardWrapper}>
				<TrainerCard />
			</View>

			<View style={styles.buttonContainer}>
				<Button
					title="Volver al Inicio"
					onPress={() => router.replace('/(tabs)/(trainer)')}
					variant="outline"
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.surface,
		justifyContent: 'center',
	},
	cardWrapper: {
		flex: 1,
		justifyContent: 'center',
	},
	buttonContainer: {
		padding: SPACING.xl,
	},
});
