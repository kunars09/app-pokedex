import { StyleSheet, Text, View } from 'react-native';

import { BORDER_RADIUS, COLORS, SPACING } from '@/styles';

type Props = {
	label: string;
	value: number;
	maxValue?: number;
	color?: string;
};

export const StatBar = ({
	label,
	value,
	maxValue = 255,
	color = COLORS.primary,
}: Props) => {
	const percentage = Math.min((value / maxValue) * 100, 100);

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<Text style={styles.value}>{value}</Text>
			<View style={styles.barBackground}>
				<View
					style={[
						styles.barFill,
						{ width: `${percentage}%`, backgroundColor: color },
					]}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: SPACING.xs,
	},
	label: {
		width: 50,
		fontSize: 12,
		fontWeight: '600',
		color: COLORS.gray600,
		textTransform: 'uppercase',
	},
	value: {
		width: 35,
		fontSize: 14,
		fontWeight: '700',
		color: COLORS.black,
		textAlign: 'right',
		marginRight: SPACING.sm,
	},
	barBackground: {
		flex: 1,
		height: 6,
		backgroundColor: COLORS.gray200,
		borderRadius: BORDER_RADIUS.full,
		overflow: 'hidden',
	},
	barFill: {
		height: '100%',
		borderRadius: BORDER_RADIUS.full,
	},
});
