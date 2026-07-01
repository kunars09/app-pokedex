import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import {
	type StepOneFormData,
	stepOneSchema,
} from '@/features/Trainer/utils/schemas';
import { COLORS, SPACING } from '@/styles';

export default function StepOneScreen() {
	const router = useRouter();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<StepOneFormData>({
		resolver: yupResolver(stepOneSchema),
		defaultValues: {
			fullName: '',
			age: undefined,
			email: '',
		},
	});

	const onSubmit = (data: StepOneFormData) => {
		router.push({
			pathname: '/(tabs)/(trainer)/step-two',
			params: {
				fullName: data.fullName,
				age: String(data.age),
				email: data.email,
			},
		});
	};

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<Text style={styles.stepIndicator}>Paso 1 de 2</Text>
			<Text style={styles.title}>Datos Personales</Text>

			<View style={styles.form}>
				<Controller
					control={control}
					name="fullName"
					render={({ field: { onChange, value } }) => (
						<Input
							label="Nombre completo"
							placeholder="Tu nombre completo"
							value={value}
							onChangeText={onChange}
							error={errors.fullName?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name="age"
					render={({ field: { onChange, value } }) => (
						<Input
							label="Edad"
							placeholder="Tu edad"
							value={value !== undefined ? String(value) : ''}
							onChangeText={(text) => {
								const cleaned = text.replace(/[^0-9]/g, '');
								onChange(cleaned ? Number(cleaned) : undefined);
							}}
							keyboardType="numeric"
							error={errors.age?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name="email"
					render={({ field: { onChange, value } }) => (
						<Input
							label="Email"
							placeholder="tu@email.com"
							value={value}
							onChangeText={onChange}
							keyboardType="email-address"
							error={errors.email?.message}
						/>
					)}
				/>
			</View>

			<Button title="Siguiente" onPress={handleSubmit(onSubmit)} />
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
	form: {
		marginBottom: SPACING.xl,
	},
});
