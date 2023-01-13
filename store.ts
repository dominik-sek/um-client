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

//type user extends person
type userData =
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
  user: userData;
  setUser: (user: userData) => void;
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
  user: {} as userData,
  setUser: (user) => set({ user }, true),
  clearUser: () => set({ user: {} }, true),
});
export const useUserStore = create<IUserStore>()(persist(userStore, { name: 'user' }));
export const useAuthStore = create<IAuthStore>()(devtools(persist(authStore, { name: 'auth' })));