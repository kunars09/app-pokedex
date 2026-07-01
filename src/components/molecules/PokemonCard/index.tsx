import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { getPokemonImageUrl } from '@/api/toolbox/utils';
import { BORDER_RADIUS, COLORS, SPACING } from '@/styles';

type Props = {
	id: number;
	name: string;
	onPress: () => void;
};

export const PokemonCard = ({ id, name, onPress }: Props) => {
	const imageUrl = getPokemonImageUrl(id);

	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [styles.card, pressed && styles.pressed]}
		>
			<Image
				source={{ uri: imageUrl }}
				style={styles.image}
				resizeMode="contain"
			/>
			<View style={styles.info}>
				<Text style={styles.id}>#{String(id).padStart(3, '0')}</Text>
				<Text style={styles.name}>{name}</Text>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: COLORS.white,
		borderRadius: BORDER_RADIUS.lg,
		padding: SPACING.md,
		marginHorizontal: SPACING.sm,
		marginVertical: SPACING.xs,
		flexDirection: 'row',
		alignItems: 'center',
		elevation: 2,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	pressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
	image: {
		width: 70,
		height: 70,
	},
	info: {
		marginLeft: SPACING.md,
		flex: 1,
	},
	id: {
		fontSize: 12,
		fontWeight: '600',
		color: COLORS.gray500,
	},
	name: {
		fontSize: 18,
		fontWeight: '700',
		color: COLORS.black,
		textTransform: 'capitalize',
		marginTop: SPACING.xs,
	},
});
