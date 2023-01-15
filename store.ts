import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import {
  person,
  contact,
  address,
  personal,
  library_access,
  faculty,
  gradebook,
  account,
  account_images,
  course,
  department,
  department_students,
} from '@prisma/client';

type UserData =
  person
  & {
  account: {
    account_images: account_images;
  }
} & {
  contact: contact;
} & {
  address: address;
} & {
  personal: personal;
} & {
  library_access: library_access;
} & {
  faculty: faculty;
} & {
  gradebook: {
    gradebook_id: number;
    course: course,
    department_students: {
      department: {
        department_id: number;
        study_type: string;
        name: string;
        degree: string;
        faculty: faculty;
      };
    };
  }[];
} & {
  course: course[];
}


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

let authStore = (set: any): IAuthStore => ({
  auth: false,
  setAuth: (auth) => set({ auth }),
  role: '',
  setRole: role => (set({ role })),
  logout: () => {
    set({ auth: false });
    set({ role: '' });
  },
});

let userStore = (set: any): IUserStore => ({
  user: {} as UserData,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: {} }),
});
export const useUserStore = create<IUserStore>()(devtools(persist(userStore, { name: 'user' })));
export const useAuthStore = create<IAuthStore>()(persist(authStore, { name: 'auth' }));