export const routes:Array<{path: string, name: string, permission?: string[]}> = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/profile',
    name: 'Profile',
  },
  {
    path: '/settings',
    name: 'Settings',
  },
  {
    path: '/grades',
    name: 'Grades',
  },
  {
    path:'/students',
    name:'Students',
    permission: ['ADMINISTRATOR', 'PRACOWNIK']
  },
  {
    path: '/users',
    name: 'Users',
    permission: ['ADMINISTRATOR'],
  }

];