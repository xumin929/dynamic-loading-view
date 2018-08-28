import App from '../../../components-react/App/App';
import Specifications from '../Container/Specifications';

const routes = [
    {
        component: App,
        routes: [
            { path: '/operating-item-view/specifications', exact: true, component: Specifications, menuUrl:'/operating-item-view/specifications'}
        ]
    }
];
export default routes;
