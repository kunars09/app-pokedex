import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { COLORS } from '@/styles';

type Props = {
	size?: 'small' | 'large';
	color?: string;
};

export const Loading = ({ size = 'large', color = COLORS.primary }: Props) => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size={size} color={color} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
