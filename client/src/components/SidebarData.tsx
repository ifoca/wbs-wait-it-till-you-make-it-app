import {
  FaHome,
  FaUser,
  FaUserPlus,
  FaSignInAlt,
  FaSignOutAlt,
} from 'react-icons/fa'

export const SidebarData = [
  {
    title: 'Homepage',
    path: '/',
    icon: <FaHome />,
    cName: 'nav-text',
  },
  {
    title: 'userProfile',
    path: '/user/profile',
    icon: <FaUser />,
    cName: 'nav-text',
  },
  {
    title: 'register',
    path: '/user/register',
    icon: <FaUserPlus />,
    cName: 'nav-text',
  },
  {
    title: 'login',
    path: '/user',
    icon: <FaSignInAlt />,
    cName: 'nav-text',
  },
  {
    title: 'logout',
    path: '/user/logout',
    icon: <FaSignOutAlt />,
    cName: 'nav-text',
  },
  {
    title:'favorites',
    path:'/user/favorites',
    icon:<FaHome />,
    cName:'nav-text'
  }
]

