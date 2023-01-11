import {UserRole} from '../enums/user-role';
import {FiHome, FiSettings} from "react-icons/fi";
import {IconType} from "react-icons";
import {
    AiFillProfile,
    AiOutlineBook,
    BsClock,
    BsPeopleFill,
    FaBuilding,
    HiBuildingLibrary,
    MdBuild
} from "react-icons/all";

export interface Route {
    path: string;
    name: string;
    icon: IconType;
    permission: UserRole[] | string[];
    subRoutes?: Route[];
}

export const routes: Route[] = [
    {
        path: '/',
        name: 'Home',
        permission: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT],
        icon: FiHome
    },
    {
        path: '/profile',
        name: 'Profile',
        permission: ['*'],
        icon: AiFillProfile,

    },
    {
        path: '/settings',
        name: 'Settings',
        permission: ['*'],
        icon: FiSettings,

    },
    {
        path: '/grades',
        name: 'Grades',
        permission: ['*'],
        icon: AiOutlineBook,

    },

    {
        path: '/users',
        name: 'Users',
        permission: [UserRole.ADMIN],
        icon: BsPeopleFill,
        subRoutes: [
            {
                path: '/users/manage',
                name: 'Manage users',
                permission: [UserRole.ADMIN],
                icon: MdBuild,
            },

        ]

    },
    {
        path: '/faculties',
        name: 'Faculties',
        permission: [UserRole.ADMIN],
        icon: HiBuildingLibrary,
        subRoutes: [
            {
                path: '/faculties/manage',
                name: 'Manage faculties',
                permission: [UserRole.ADMIN],
                icon: MdBuild,
            },

        ]

    },
    {
        path: '/departments',
        name: 'Departments',
        permission: [UserRole.ADMIN],
        icon: FaBuilding,
        subRoutes: [
            {
                path: '/departments/manage',
                name: 'Manage departments',
                permission: [UserRole.ADMIN],
                icon: MdBuild,
            },
            {
                path: '/departments/timetables/manage',
                name: 'Manage timetables',
                permission: [UserRole.ADMIN],
                icon: BsClock,
            },


        ]

    },
    {
        path: '/courses',
        name: 'Courses',
        permission: [UserRole.ADMIN],
        icon: AiOutlineBook,
        subRoutes: [
            {
                path: '/courses/manage',
                name: 'Manage courses',
                permission: [UserRole.ADMIN],
                icon: MdBuild,
            },

        ]

    },

];