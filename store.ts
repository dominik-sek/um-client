import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserData } from './src/types/User';

export interface IAuthStore {
	auth: boolean;
	setAuth: (auth: boolean) => void;
	role: string;
	setRole: (role: string) => void;
	logout: () => void;
}

export interface IUserStore {
	user: UserData;
	setUser: (user: UserData) => void;
	clearUser: () => void;
}

const initialAuthState = {
	auth: false,
	role: '',
};
const initialUserState = {
	user: {} as UserData,
};

const authStore = (set: any): IAuthStore => ({
	auth: false,
	setAuth: (auth) => set({ auth }),
	role: '',
	setRole: (role) => set({ role }),
	logout: () => {
		set(initialAuthState);
	},
});

const userStore = (set: any, get: any): IUserStore => ({
	user: {} as UserData,
	setUser: (user) => set({ user: user }),
	clearUser: () => {
		set(initialUserState);
	},
});
export const useUserStore = create<IUserStore>()(
	persist(userStore, { name: 'user' }),
);
export const useAuthStore = create<IAuthStore>()(
	persist(authStore, { name: 'auth' }),
);
