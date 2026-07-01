import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

import { COLORS } from '@/styles';

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: true,
				tabBarActiveTintColor: COLORS.primary,
				tabBarInactiveTintColor: COLORS.gray400,
				tabBarStyle: {
					backgroundColor: COLORS.white,
					borderTopColor: COLORS.gray200,
				},
			}}
		>
			<Tabs.Screen
				name="(pokedex)"
				options={{
					title: 'Pokédex',
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="book-outline" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="(trainer)"
				options={{
					title: 'Entrenador',
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person-outline" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
