import create from 'zustand';
import {devtools, persist} from "zustand/middleware";

export interface IAuthStore {
    auth: boolean;
    setAuth: (auth: boolean) => void;
    role: string;
    setRole: (role: string) => void;
    logout: () => void;
}
export interface IUserStore {
    user: any;
    setUser: (user: {}) => void;
    clearUser: () => void;
}

let authStore = (set: any):IAuthStore =>({
    auth: false,
    setAuth: (auth) => set({auth}),
    role: '',
    setRole: role => (set({role})),
    logout: () => {
        set({auth: false});
        set({role: ''});
    }
})

let userStore = (set: any):IUserStore =>({
    user: {},
    setUser: (user) => set({user}),
    clearUser: () => set({user: {}})
});
export const useUserStore = create<IUserStore>()(persist(userStore, {name:'user'}))
export const useAuthStore = create<IAuthStore>()(devtools(persist(authStore, {name: 'auth'})));