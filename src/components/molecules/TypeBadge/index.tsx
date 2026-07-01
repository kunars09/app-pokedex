import { StyleSheet, Text, View } from 'react-native';

import { BORDER_RADIUS, COLORS, SPACING } from '@/styles';

type Props = {
	type: string;
};

const TYPE_COLORS: Record<string, string> = {
	normal: COLORS.normal,
	fire: COLORS.fire,
	water: COLORS.water,
	grass: COLORS.grass,
	electric: COLORS.electric,
	ice: COLORS.ice,
	fighting: COLORS.fighting,
	poison: COLORS.poison,
	ground: COLORS.ground,
	flying: COLORS.flying,
	psychic: COLORS.psychic,
	bug: COLORS.bug,
	rock: COLORS.rock,
	ghost: COLORS.ghost,
	dragon: COLORS.dragon,
	dark: COLORS.dark,
	steel: COLORS.steel,
	fairy: COLORS.fairy,
};

export const TypeBadge = ({ type }: Props) => {
	const bgColor = TYPE_COLORS[type] ?? COLORS.gray400;

	return (
		<View style={[styles.badge, { backgroundColor: bgColor }]}>
			<Text style={styles.text}>{type}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	badge: {
		paddingHorizontal: SPACING.md,
		paddingVertical: SPACING.xs,
		borderRadius: BORDER_RADIUS.full,
		marginRight: SPACING.sm,
	},
	text: {
		color: COLORS.white,
		fontSize: 12,
		fontWeight: '700',
		textTransform: 'capitalize',
	},
});
