import create from 'zustand';
import {devtools, persist} from "zustand/middleware";

export interface IAuthStore {
    auth: boolean;
    setAuth: (auth: boolean) => void;
    role: string;
    setRole: (role: string) => void;
}

let authStore = (set: any):IAuthStore =>({
    auth: false,
    setAuth: (auth) => set({auth}),
    role: '',
    setRole: role => (set({role}))
})

export const useAuthStore = create<IAuthStore>()(devtools(persist(authStore, {name: 'auth'})));