import { useCallback } from 'react';

import { FlatList, StyleSheet, Text, View } from 'react-native';

import type { PokemonListItem } from '@/api/interfaces';

import { getPokemonIdFromUrl } from '@/api/toolbox/utils';
import { Button } from '@/components/atoms/Button';
import { Loading } from '@/components/atoms/Loading';
import { PokemonCard } from '@/components/molecules/PokemonCard';
import { usePokemonList } from '@/features/Pokedex/hooks/usePokemonList';
import { COLORS, SPACING } from '@/styles';

type Props = {
	onPokemonPress: (id: number) => void;
};

export const PokemonList = ({ onPokemonPress }: Props) => {
	const {
		data,
		isLoading,
		isError,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch,
	} = usePokemonList();

	const allPokemon = data?.pages.flatMap((page) => page.results) ?? [];

	const handleEndReached = useCallback(() => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	const renderItem = useCallback(
		({ item }: { item: PokemonListItem }) => {
			const id = getPokemonIdFromUrl(item.url);
			return (
				<PokemonCard
					id={id}
					name={item.name}
					onPress={() => onPokemonPress(id)}
				/>
			);
		},
		[onPokemonPress],
	);

	if (isLoading) {
		return <Loading />;
	}

	if (isError) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>
					{error?.message ?? 'Error al cargar los Pokémon'}
				</Text>
				<Button
					title="Reintentar"
					onPress={() => refetch()}
					variant="outline"
				/>
			</View>
		);
	}

	return (
		<FlatList
			data={allPokemon}
			renderItem={renderItem}
			keyExtractor={(item) => item.name}
			onEndReached={handleEndReached}
			onEndReachedThreshold={0.5}
			contentContainerStyle={styles.listContent}
			ListFooterComponent={isFetchingNextPage ? <Loading size="small" /> : null}
		/>
	);
};

const styles = StyleSheet.create({
	listContent: {
		paddingVertical: SPACING.sm,
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
