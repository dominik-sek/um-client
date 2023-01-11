import {UserRole} from '../enums/user-role';
import {FiHome, FiPlus, FiSettings} from "react-icons/fi";
import {IconType} from "react-icons";
import {AiFillProfile, AiOutlineBook, BsPeopleFill, MdPeople} from "react-icons/all";

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
                icon: MdPeople,
            },
            {
                path: '/users/new',
                name: 'Add new user',
                permission: [UserRole.ADMIN],
                icon: FiPlus,
            },


        ]

    }

];