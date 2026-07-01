import {
	Pressable,
	StyleSheet,
	Text,
	type TextStyle,
	type ViewStyle,
} from 'react-native';

import { BORDER_RADIUS, COLORS, SPACING } from '@/styles';

type Props = {
	title: string;
	onPress: () => void;
	variant?: 'primary' | 'secondary' | 'outline';
	disabled?: boolean;
	style?: ViewStyle;
};

export const Button = ({
	title,
	onPress,
	variant = 'primary',
	disabled = false,
	style,
}: Props) => {
	return (
		<Pressable
			onPress={onPress}
			disabled={disabled}
			style={({ pressed }) => [
				styles.base,
				styles[variant],
				pressed && styles.pressed,
				disabled && styles.disabled,
				style,
			]}
		>
			<Text
				style={[
					styles.text,
					styles[`${variant}Text` as keyof typeof styles] as TextStyle,
				]}
			>
				{title}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	base: {
		paddingVertical: SPACING.md,
		paddingHorizontal: SPACING.xl,
		borderRadius: BORDER_RADIUS.md,
		alignItems: 'center',
		justifyContent: 'center',
	},
	primary: {
		backgroundColor: COLORS.primary,
	},
	secondary: {
		backgroundColor: COLORS.gray200,
	},
	outline: {
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: COLORS.primary,
	},
	pressed: {
		opacity: 0.8,
	},
	disabled: {
		opacity: 0.5,
	},
	text: {
		fontSize: 16,
		fontWeight: '600',
	},
	primaryText: {
		color: COLORS.white,
	},
	secondaryText: {
		color: COLORS.black,
	},
	outlineText: {
		color: COLORS.primary,
	},
});
