import { Stack } from 'expo-router';

import { COLORS } from '@/styles';

export default function PokedexLayout() {
	return (
		<Stack
			screenOptions={{
				headerStyle: { backgroundColor: COLORS.primary },
				headerTintColor: COLORS.white,
				headerTitleStyle: { fontWeight: '700' },
			}}
		>
			<Stack.Screen name="index" options={{ title: 'Pokédex' }} />
			<Stack.Screen
				name="[id]"
				options={{
					title: 'Detalle',
					animation: 'fade_from_bottom',
					animationDuration: 250,
				}}
			/>
		</Stack>
	);
}
