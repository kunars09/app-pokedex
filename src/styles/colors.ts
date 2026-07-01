export const COLORS = {
	// Primary
	primary: '#DC0A2D',
	primaryLight: '#FF6B6B',
	primaryDark: '#A00020',

	// Neutral
	white: '#FFFFFF',
	black: '#1D1D1D',
	gray100: '#F5F5F5',
	gray200: '#E0E0E0',
	gray300: '#BDBDBD',
	gray400: '#9E9E9E',
	gray500: '#757575',
	gray600: '#616161',
	gray700: '#424242',

	// Pokemon Types
	fire: '#F08030',
	water: '#6890F0',
	grass: '#78C850',
	electric: '#F8D030',
	ice: '#98D8D8',
	fighting: '#C03028',
	poison: '#A040A0',
	ground: '#E0C068',
	flying: '#A890F0',
	psychic: '#F85888',
	bug: '#A8B820',
	rock: '#B8A038',
	ghost: '#705898',
	dragon: '#7038F8',
	dark: '#705848',
	steel: '#B8B8D0',
	fairy: '#EE99AC',
	normal: '#A8A878',

	// Semantic
	success: '#4CAF50',
	error: '#F44336',
	warning: '#FF9800',
	info: '#2196F3',

	// Background
	background: '#FFFFFF',
	surface: '#F5F5F5',
} as const;

export type ColorKey = keyof typeof COLORS;
