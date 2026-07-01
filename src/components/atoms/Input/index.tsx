import { StyleSheet, Text, TextInput, View } from 'react-native';

import { BORDER_RADIUS, COLORS, SPACING } from '@/styles';

type Props = {
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
	label?: string;
	error?: string;
	keyboardType?: 'default' | 'email-address' | 'numeric';
	secureTextEntry?: boolean;
};

export const Input = ({
	value,
	onChangeText,
	placeholder,
	label,
	error,
	keyboardType = 'default',
	secureTextEntry = false,
}: Props) => {
	return (
		<View style={styles.container}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor={COLORS.gray400}
				keyboardType={keyboardType}
				secureTextEntry={secureTextEntry}
				style={[styles.input, error && styles.inputError]}
			/>
			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: SPACING.lg,
	},
	label: {
		fontSize: 14,
		fontWeight: '500',
		color: COLORS.gray700,
		marginBottom: SPACING.xs,
	},
	input: {
		borderWidth: 1,
		borderColor: COLORS.gray300,
		borderRadius: BORDER_RADIUS.md,
		paddingHorizontal: SPACING.lg,
		paddingVertical: SPACING.md,
		fontSize: 16,
		color: COLORS.black,
		backgroundColor: COLORS.white,
	},
	inputError: {
		borderColor: COLORS.error,
	},
	error: {
		fontSize: 12,
		color: COLORS.error,
		marginTop: SPACING.xs,
	},
});
