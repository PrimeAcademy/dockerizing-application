import HomePage from "../component/pages/HomePage/HomePage";
import AboutPage from "../component/pages/AboutPage/AboutPage";
import ContainersPage from "../component/pages/ContainersPage/ContainersPage";

const navConfig = [
    {
        name: 'Home',
        path: '/',
        exact: true,
        comp: HomePage,
        mainNav: true,
    },
    {
        name: 'About',
        path: '/about',
        exact: false,
        comp: AboutPage,
        mainNav: true,
    },
    {
        name: 'Containers',
        path: '/containers',
        exact: false,
        comp: ContainersPage,
        mainNav: true,
    }
];

export default navConfig;
