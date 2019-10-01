import HomePage from "../component/pages/HomePage/HomePage";
import AboutPage from "../component/pages/AboutPage/AboutPage";
import ContainersPage from "../component/pages/ContainersPage/ContainersPage";
import ToolBoxPage from "../component/pages/ToolBoxPage/ToolBoxPage";

const navConfig = [
    {
        name: 'Home',
        path: '/',
        exact: true,
        comp: HomePage,
        mainNav: true,
    },
    {
        name: 'Containers',
        path: '/containers',
        exact: false,
        comp: ContainersPage,
        mainNav: true,
    },
    {
        name: 'Tool Box',
        path: '/tool-box',
        exact: false,
        comp: ToolBoxPage,
        mainNav: true,
    },
    {
        name: 'About',
        path: '/about',
        exact: false,
        comp: AboutPage,
        mainNav: true,
    },
];

export default navConfig;
