import { UserRole } from '../enums/user-role';

export const routes:Array<{path: string, name: string, permission: string[], icon?:string}> = [
  {
    path: '/',
    name: 'Home',
    permission: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT],
    icon: '🏠',
  },
  {
    path: '/profile',
    name: 'Profile',
    permission: ['*'],
    icon: '💀',

  },
  {
    path: '/settings',
    name: 'Settings',
    permission: ['*'],
    icon: '⚙',

  },
  {
    path: '/grades',
    name: 'Grades',
    permission: ['*'],
    icon: '💯',

  },
  {
    path:'/students',
    name:'Students',
    permission: [UserRole.ADMIN, UserRole.TEACHER],
    icon: '🐈‍',

  },
  {
    path: '/users',
    name: 'Users',
    permission: [UserRole.ADMIN],
    icon: '🧑‍',

  }

];