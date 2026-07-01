import { useState } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { queryClient } from '@/api/query-client';
import { SplashScreen } from '@/components/organisms/SplashScreen';

export default function RootLayout() {
	const [showSplash, setShowSplash] = useState(true);

	return (
		<QueryClientProvider client={queryClient}>
			<StatusBar style="light" />
			{showSplash ? (
				<SplashScreen onFinish={() => setShowSplash(false)} />
			) : (
				<Stack screenOptions={{ headerShown: false }} />
			)}
		</QueryClientProvider>
	);
}
