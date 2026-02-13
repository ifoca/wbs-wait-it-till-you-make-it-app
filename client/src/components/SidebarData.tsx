import { FaHome, FaUser, FaSave, FaUserPlus, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

export const SidebarData = [
  {
    title: 'Homepage',
    path: '/',
    icon: <FaHome />,
    cName: 'nav-text',
  },
  {
    title: 'User Profile',
    path: '/user/profile',
    icon: <FaUser />,
    cName: 'nav-text',
  },
  {
    title: 'Favorites',
    path: '/user/favorites',
    icon: <FaSave />,
    cName: 'nav-text',
  },
  {
    title: 'Register',
    path: '/user/register',
    icon: <FaUserPlus />,
    cName: 'nav-text',
  },
  {
    title: 'Login',
    path: '/user',
    icon: <FaSignInAlt />,
    cName: 'nav-text',
  },
  {
    title: 'Logout',
    path: '/',
    icon: <FaSignOutAlt />,
    cName: 'nav-text',
  },
];
