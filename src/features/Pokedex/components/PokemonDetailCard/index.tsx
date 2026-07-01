import { useEffect, useRef } from 'react';

import {
	Animated,
	Easing,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Loading } from '@/components/atoms/Loading';
import { StatBar } from '@/components/molecules/StatBar';
import { TypeBadge } from '@/components/molecules/TypeBadge';
import { usePokemonDetail } from '@/features/Pokedex/hooks/usePokemonDetail';
import { COLORS, SPACING } from '@/styles';

type Props = {
	id: number;
};

const STAT_COLORS: Record<string, string> = {
	hp: '#FF5959',
	attack: '#F5AC78',
	defense: '#FAE078',
	'special-attack': '#9DB7F5',
	'special-defense': '#A7DB8D',
	speed: '#FA92B2',
};

export const PokemonDetailCard = ({ id }: Props) => {
	const {
		data: pokemon,
		isLoading,
		isError,
		error,
		refetch,
	} = usePokemonDetail(id);

	const imageAnim = useRef(new Animated.Value(0)).current;
	const infoAnim = useRef(new Animated.Value(0)).current;
	const statsAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (pokemon) {
			Animated.stagger(120, [
				Animated.timing(imageAnim, {
					toValue: 1,
					duration: 400,
					easing: Easing.out(Easing.cubic),
					useNativeDriver: true,
				}),
				Animated.timing(infoAnim, {
					toValue: 1,
					duration: 350,
					easing: Easing.out(Easing.cubic),
					useNativeDriver: true,
				}),
				Animated.timing(statsAnim, {
					toValue: 1,
					duration: 350,
					easing: Easing.out(Easing.cubic),
					useNativeDriver: true,
				}),
			]).start();
		}
	}, [pokemon]);

	if (isLoading) {
		return <Loading />;
	}

	if (isError || !pokemon) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>
					{error?.message ?? 'Error al cargar el Pokémon'}
				</Text>
				<Button
					title="Reintentar"
					onPress={() => refetch()}
					variant="outline"
				/>
			</View>
		);
	}

	const imageUrl =
		pokemon.sprites.other['official-artwork'].front_default ??
		pokemon.sprites.front_default;

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<Animated.View
				style={[
					styles.imageContainer,
					{
						opacity: imageAnim,
						transform: [
							{
								translateY: imageAnim.interpolate({
									inputRange: [0, 1],
									outputRange: [-15, 0],
								}),
							},
							{
								scale: imageAnim.interpolate({
									inputRange: [0, 1],
									outputRange: [0.95, 1],
								}),
							},
						],
					},
				]}
			>
				{imageUrl && (
					<Image
						source={{ uri: imageUrl }}
						style={styles.image}
						resizeMode="contain"
					/>
				)}
			</Animated.View>

			<Animated.View
				style={{
					opacity: infoAnim,
					transform: [
						{
							translateY: infoAnim.interpolate({
								inputRange: [0, 1],
								outputRange: [12, 0],
							}),
						},
					],
					alignItems: 'center',
				}}
			>
				<Text style={styles.id}>#{String(pokemon.id).padStart(3, '0')}</Text>
				<Text style={styles.name}>{pokemon.name}</Text>

				<View style={styles.typesRow}>
					{pokemon.types.map((t) => (
						<TypeBadge key={t.type.name} type={t.type.name} />
					))}
				</View>

				<View style={styles.infoRow}>
					<View style={styles.infoItem}>
						<Text style={styles.infoValue}>
							{(pokemon.weight / 10).toFixed(1)} kg
						</Text>
						<Text style={styles.infoLabel}>Peso</Text>
					</View>
					<View style={styles.infoItem}>
						<Text style={styles.infoValue}>
							{(pokemon.height / 10).toFixed(1)} m
						</Text>
						<Text style={styles.infoLabel}>Altura</Text>
					</View>
				</View>
			</Animated.View>

			<Animated.View
				style={{
					opacity: statsAnim,
					transform: [
						{
							translateY: statsAnim.interpolate({
								inputRange: [0, 1],
								outputRange: [16, 0],
							}),
						},
					],
					width: '100%',
				}}
			>
				<Text style={styles.sectionTitle}>Estadísticas Base</Text>
				{pokemon.stats.map((stat) => (
					<StatBar
						key={stat.stat.name}
						label={stat.stat.name.replace('special-', 'Sp.')}
						value={stat.base_stat}
						color={STAT_COLORS[stat.stat.name] ?? COLORS.gray400}
					/>
				))}
			</Animated.View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		padding: SPACING.lg,
		alignItems: 'center',
	},
	imageContainer: {
		width: 200,
		height: 200,
		marginBottom: SPACING.lg,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	id: {
		fontSize: 14,
		fontWeight: '600',
		color: COLORS.gray500,
	},
	name: {
		fontSize: 28,
		fontWeight: '700',
		color: COLORS.black,
		textTransform: 'capitalize',
		marginTop: SPACING.xs,
	},
	typesRow: {
		flexDirection: 'row',
		marginTop: SPACING.md,
		marginBottom: SPACING.xl,
	},
	infoRow: {
		flexDirection: 'row',
		gap: SPACING.xxl,
		marginBottom: SPACING.xl,
	},
	infoItem: {
		alignItems: 'center',
	},
	infoValue: {
		fontSize: 16,
		fontWeight: '700',
		color: COLORS.black,
	},
	infoLabel: {
		fontSize: 12,
		color: COLORS.gray500,
		marginTop: SPACING.xs,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: COLORS.black,
		alignSelf: 'flex-start',
		marginBottom: SPACING.md,
	},
	errorContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: SPACING.xl,
		gap: SPACING.lg,
	},
	errorText: {
		fontSize: 16,
		color: COLORS.error,
		textAlign: 'center',
	},
});
