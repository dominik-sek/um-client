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
    semester: string;
    department_students: {
      department: {
        department_id: number;
        study_type: string;
        name: string;
        degree: string;
        faculty: faculty;
      };
    };
  }
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
  setRole: role => (set({ role })),
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
export const useUserStore = create<IUserStore>()(devtools(persist(userStore, { name: 'user' })));
export const useAuthStore = create<IAuthStore>()(persist(authStore, { name: 'auth' }));