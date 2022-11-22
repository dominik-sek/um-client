import { UserRole } from '../enums/user-role';

export const routes:Array<{path: string, name: string, permission: string[]}> = [
  {
    path: '/',
    name: 'Home',
    permission: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT],

  },
  {
    path: '/profile',
    name: 'Profile',
    permission: ['*'],

  },
  {
    path: '/settings',
    name: 'Settings',
    permission: ['*'],

  },
  {
    path: '/grades',
    name: 'Grades',
    permission: ['*'],

  },
  {
    path:'/students',
    name:'Students',
    permission: [UserRole.ADMIN, UserRole.TEACHER],
  },
  {
    path: '/users',
    name: 'Users',
    permission: [UserRole.ADMIN],
  }

];