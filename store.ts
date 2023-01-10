import create from 'zustand';
import {devtools, persist} from "zustand/middleware";

export interface IAuthStore {
    auth: boolean;
    setAuth: (auth: boolean) => void;
    role: string;
    setRole: (role: string) => void;
}
export interface IUserStore {
    user: any;
    setUser: (user: {}) => void;
}

let authStore = (set: any):IAuthStore =>({
    auth: false,
    setAuth: (auth) => set({auth}),
    role: '',
    setRole: role => (set({role}))
})

let userStore = (set: any):IUserStore =>({
    user: {},
    setUser: (user) => set({user})
});
export const useUserStore = create<IUserStore>()(devtools(persist(userStore, {name:'user'})))
export const useAuthStore = create<IAuthStore>()(devtools(persist(authStore, {name: 'auth'})));