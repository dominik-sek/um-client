import { UserRole } from '../enums/user-role';
import { FiHome } from 'react-icons/fi';
import { IconType } from 'react-icons';
import {
	AiFillProfile,
	AiOutlineBook,
	BiBriefcase,
	BsClock,
	BsPeopleFill,
	FaBuilding,
	FaPrint,
	HiBuildingLibrary,
	MdBuild,
} from 'react-icons/all';

export interface Route {
	path: string;
	name: string;
	icon: IconType;
	permission: UserRole[] | string[];
	subRoutes?: Route[];
	key: string;
}

export const routes: Route[] = [
	{
		path: '/',
		name: 'Home',
		permission: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT],
		icon: FiHome,
		key: 'routes.home',
	},
	{
		path: '/profile',
		name: 'Profile',
		permission: ['*'],
		icon: AiFillProfile,
		key: 'routes.profile',
	},
	{
		path: '/grades',
		name: 'Grades',
		permission: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT],
		icon: AiOutlineBook,
		key: 'routes.grades',
	},

	{
		path: '/users',
		name: 'Users',
		permission: [UserRole.ADMIN],
		icon: BsPeopleFill,
		key: 'routes.users',
		subRoutes: [
			{
				path: '/users/manage',
				name: 'Manage users',
				permission: [UserRole.ADMIN],
				icon: MdBuild,
				key: 'routes.manage-users',
			},
		],
	},
	{
		path: '/faculties',
		name: 'Faculties',
		permission: [UserRole.ADMIN],
		icon: HiBuildingLibrary,
		key: 'routes.faculties',
		subRoutes: [
			{
				path: '/faculties/manage',
				name: 'Manage faculties',
				permission: [UserRole.ADMIN],
				icon: MdBuild,
				key: 'routes.manage-faculties',
			},
		],
	},
	{
		path: '/departments',
		name: 'Departments',
		permission: [UserRole.ADMIN],
		icon: FaBuilding,
		key: 'routes.departments',
		subRoutes: [
			{
				path: '/departments/manage',
				name: 'Manage departments',
				permission: [UserRole.ADMIN],
				icon: MdBuild,
				key: 'routes.manage-departments',
			},
			{
				path: '/departments/timetables/manage',
				name: 'Manage timetables',
				permission: [UserRole.ADMIN],
				icon: BsClock,
				key: 'routes.manage-timetables',
			},
		],
	},
	{
		path: '/courses',
		name: 'Courses',
		permission: [UserRole.ADMIN],
		icon: AiOutlineBook,
		key: 'routes.courses',
		subRoutes: [
			{
				path: '/courses/manage',
				name: 'Manage courses',
				permission: [UserRole.ADMIN],
				icon: MdBuild,
				key: 'routes.manage-courses',
			},
		],
	},
	// {
	//   path: '/payments',
	//   name: 'payments',
	//   permission: [UserRole.ADMIN],
	//   icon: AiOutlineBook,
	//   key: 'routes.payments',
	//   subRoutes: [
	//     {
	//       path: '/payments/manage',
	//       name: 'Manage payments',
	//       permission: [UserRole.ADMIN],
	//       icon: MdBuild,
	//       key: 'routes.manage-payments',
	//     },
	//
	//   ],
	// },

	{
		path: '/documents',
		name: 'Documents',
		permission: [],
		icon: BiBriefcase,
		key: 'routes.documents',
		subRoutes: [],
	},

	{
		path: '/documents',
		name: 'Documents',
		permission: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT],
		icon: BiBriefcase,
		key: 'routes.documents',
		subRoutes: [
			{
				path: '/documents/manage',
				name: 'Manage documents',
				permission: [UserRole.ADMIN],
				icon: BiBriefcase,
				key: 'routes.manage-documents',
			},
		],
	},
	{
		path: '/printouts',
		name: 'Printouts',
		permission: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT],
		icon: FaPrint,
		key: 'routes.printouts',
		subRoutes: [
		 	{
		 		path: '/printouts',
		 		name: 'Manage printouts',
		 		permission: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT],
		 		icon: FaPrint,
		 		key: 'routes.manage-printouts',
		 	},
		 ],
	},
];
