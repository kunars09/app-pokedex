import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import type { TrainerProfile } from '@/toolbox/interfaces';

interface TrainerActions {
	setProfile: (data: TrainerProfile) => void;
	resetProfile: () => void;
}

interface TrainerState {
	profile: TrainerProfile | null;
}

type TrainerStoreProps = TrainerState & TrainerActions;

const initialState: TrainerState = {
	profile: null,
};

export const useTrainerStore = create<TrainerStoreProps>()(
	devtools(
		persist(
			(set) => ({
				...initialState,
				setProfile: (data) => set({ profile: data }, undefined, 'setProfile'),
				resetProfile: () => set({ ...initialState }, undefined, 'resetProfile'),
			}),
			{
				name: 'trainer-store',
				storage: createJSONStorage(() => AsyncStorage),
			},
		),
	),
);
