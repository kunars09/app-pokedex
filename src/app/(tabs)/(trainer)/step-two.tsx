import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { PokemonType } from '@/toolbox/enums';

import { Button } from '@/components/atoms/Button';
import {
	POKEMON_TYPES_OPTIONS,
	REGIONS,
} from '@/features/Trainer/constants/options';
import {
	type StepTwoFormData,
	stepTwoSchema,
} from '@/features/Trainer/utils/schemas';
import { useTrainerStore } from '@/store';
import { BORDER_RADIUS, COLORS, SPACING } from '@/styles';

export default function StepTwoScreen() {
	const router = useRouter();
	const params = useLocalSearchParams<{
		fullName: string;
		age: string;
		email: string;
	}>();
	const setProfile = useTrainerStore((state) => state.setProfile);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<StepTwoFormData>({
		resolver: yupResolver(stepTwoSchema),
		defaultValues: {
			region: '',
			favoritePokemonType: '',
		},
	});

	const onSubmit = (data: StepTwoFormData) => {
		setProfile({
			fullName: params.fullName,
			age: Number(params.age),
			email: params.email,
			region: data.region,
			favoritePokemonType: data.favoritePokemonType as PokemonType,
		});

		router.push('/(tabs)/(trainer)/summary');
	};

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<Text style={styles.stepIndicator}>Paso 2 de 2</Text>
			<Text style={styles.title}>Preferencias</Text>

			<View style={styles.section}>
				<Text style={styles.label}>Distrito de origen</Text>
				{errors.region && (
					<Text style={styles.error}>{errors.region.message}</Text>
				)}
				<Controller
					control={control}
					name="region"
					render={({ field: { onChange, value } }) => (
						<View style={styles.optionsGrid}>
							{REGIONS.map((region) => (
								<Pressable
									key={region}
									style={[
										styles.option,
										value === region && styles.optionSelected,
									]}
									onPress={() => onChange(region)}
								>
									<Text
										style={[
											styles.optionText,
											value === region && styles.optionTextSelected,
										]}
									>
										{region}
									</Text>
								</Pressable>
							))}
						</View>
					)}
				/>
			</View>

			<View style={styles.section}>
				<Text style={styles.label}>Tipo de Pokémon favorito</Text>
				{errors.favoritePokemonType && (
					<Text style={styles.error}>{errors.favoritePokemonType.message}</Text>
				)}
				<Controller
					control={control}
					name="favoritePokemonType"
					render={({ field: { onChange, value } }) => (
						<View style={styles.optionsGrid}>
							{POKEMON_TYPES_OPTIONS.map((type) => (
								<Pressable
									key={type}
									style={[
										styles.option,
										value === type && styles.optionSelected,
									]}
									onPress={() => onChange(type)}
								>
									<Text
										style={[
											styles.optionText,
											value === type && styles.optionTextSelected,
										]}
									>
										{type}
									</Text>
								</Pressable>
							))}
						</View>
					)}
				/>
			</View>

			<Button title="Completar Registro" onPress={handleSubmit(onSubmit)} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	content: {
		padding: SPACING.xl,
	},
	stepIndicator: {
		fontSize: 14,
		fontWeight: '500',
		color: COLORS.primary,
		marginBottom: SPACING.sm,
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
		color: COLORS.black,
		marginBottom: SPACING.xl,
	},
	section: {
		marginBottom: SPACING.xl,
	},
	label: {
		fontSize: 14,
		fontWeight: '600',
		color: COLORS.gray700,
		marginBottom: SPACING.sm,
	},
	error: {
		fontSize: 12,
		color: COLORS.error,
		marginBottom: SPACING.sm,
	},
	optionsGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: SPACING.sm,
	},
	option: {
		paddingHorizontal: SPACING.lg,
		paddingVertical: SPACING.md,
		borderRadius: BORDER_RADIUS.md,
		borderWidth: 1,
		borderColor: COLORS.gray300,
		backgroundColor: COLORS.white,
	},
	optionSelected: {
		borderColor: COLORS.primary,
		backgroundColor: COLORS.primary,
	},
	optionText: {
		fontSize: 14,
		fontWeight: '500',
		color: COLORS.gray700,
		textTransform: 'capitalize',
	},
	optionTextSelected: {
		color: COLORS.white,
	},
});
