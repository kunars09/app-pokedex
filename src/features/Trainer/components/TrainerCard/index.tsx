import { StyleSheet, Text, View } from 'react-native';

import { useTrainerStore } from '@/store/trainerStore';
import { BORDER_RADIUS, COLORS, SPACING } from '@/styles';

export const TrainerCard = () => {
	const profile = useTrainerStore((state) => state.profile);

	if (!profile) {
		return (
			<View style={styles.emptyContainer}>
				<Text style={styles.emptyText}>
					No hay perfil de entrenador registrado
				</Text>
			</View>
		);
	}

	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<Text style={styles.title}>Carnet de Entrenador</Text>
			</View>

			<View style={styles.body}>
				<View style={styles.field}>
					<Text style={styles.label}>Nombre</Text>
					<Text style={styles.value}>{profile.fullName}</Text>
				</View>

				<View style={styles.field}>
					<Text style={styles.label}>Edad</Text>
					<Text style={styles.value}>{profile.age} años</Text>
				</View>

				<View style={styles.field}>
					<Text style={styles.label}>Email</Text>
					<Text style={styles.value}>{profile.email}</Text>
				</View>

				<View style={styles.field}>
					<Text style={styles.label}>Distrito</Text>
					<Text style={styles.value}>{profile.region}</Text>
				</View>

				<View style={styles.field}>
					<Text style={styles.label}>Tipo Favorito</Text>
					<Text style={[styles.value, styles.typeValue]}>
						{profile.favoritePokemonType}
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: COLORS.white,
		borderRadius: BORDER_RADIUS.xl,
		overflow: 'hidden',
		elevation: 4,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 8,
		margin: SPACING.lg,
	},
	header: {
		backgroundColor: COLORS.primary,
		paddingVertical: SPACING.lg,
		paddingHorizontal: SPACING.xl,
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
		color: COLORS.white,
		textAlign: 'center',
	},
	body: {
		padding: SPACING.xl,
		gap: SPACING.md,
	},
	field: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: SPACING.sm,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.gray100,
	},
	label: {
		fontSize: 14,
		fontWeight: '500',
		color: COLORS.gray500,
	},
	value: {
		fontSize: 16,
		fontWeight: '600',
		color: COLORS.black,
	},
	typeValue: {
		textTransform: 'capitalize',
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: SPACING.xl,
	},
	emptyText: {
		fontSize: 16,
		color: COLORS.gray500,
		textAlign: 'center',
	},
});
