import type { TextStyle } from 'react-native';

export const TYPOGRAPHY: Record<string, TextStyle> = {
	h1: {
		fontSize: 28,
		fontWeight: '700',
		lineHeight: 34,
	},
	h2: {
		fontSize: 24,
		fontWeight: '700',
		lineHeight: 30,
	},
	h3: {
		fontSize: 20,
		fontWeight: '600',
		lineHeight: 26,
	},
	body: {
		fontSize: 16,
		fontWeight: '400',
		lineHeight: 22,
	},
	bodyBold: {
		fontSize: 16,
		fontWeight: '600',
		lineHeight: 22,
	},
	caption: {
		fontSize: 12,
		fontWeight: '400',
		lineHeight: 16,
	},
	label: {
		fontSize: 14,
		fontWeight: '500',
		lineHeight: 20,
	},
} as const;
