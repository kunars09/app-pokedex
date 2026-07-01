import * as yup from 'yup';

export const stepOneSchema = yup.object({
	fullName: yup
		.string()
		.required('El nombre es obligatorio')
		.min(3, 'El nombre debe tener al menos 3 caracteres'),
	age: yup
		.number()
		.required('La edad es obligatoria')
		.min(10, 'Debes tener al menos 10 años')
		.max(100, 'Edad no válida'),
	email: yup
		.string()
		.required('El email es obligatorio')
		.email('Ingresa un email válido'),
});

export const stepTwoSchema = yup.object({
	region: yup.string().required('Selecciona un distrito de origen'),
	favoritePokemonType: yup
		.string()
		.required('Selecciona un tipo de Pokémon favorito'),
});

export type StepOneFormData = yup.InferType<typeof stepOneSchema>;
export type StepTwoFormData = yup.InferType<typeof stepTwoSchema>;
