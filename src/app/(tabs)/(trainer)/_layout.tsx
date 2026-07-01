import { Stack } from 'expo-router';

import { COLORS } from '@/styles';

export default function TrainerLayout() {
	return (
		<Stack
			screenOptions={{
				headerStyle: { backgroundColor: COLORS.primary },
				headerTintColor: COLORS.white,
				headerTitleStyle: { fontWeight: '700' },
			}}
		>
			<Stack.Screen name="index" options={{ title: 'Perfil de Entrenador' }} />
			<Stack.Screen name="step-one" options={{ title: 'Datos Personales' }} />
			<Stack.Screen name="step-two" options={{ title: 'Preferencias' }} />
			<Stack.Screen
				name="summary"
				options={{ title: 'Carnet de Entrenador' }}
			/>
		</Stack>
	);
}
