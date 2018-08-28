import App from '../../../components-react/App/App';
import Brand from '../Container/Brand';

const routes = [
    {
        component: App,
        routes: [
            { path: '/operating-item-view/brand/', exact: true, component: Brand, menuUrl:'/operating-item-view/brand'}
        ]
    }
];
export default routes;
