import App from '../../../components-react/App/App';
import Category from '../Container/Category';

const routes = [
    {
        component: App,
        routes: [
            { path: '/operating-item-view/category', exact: true, component: Category, menuUrl:'/operating-item-view/category'}
        ]
    }
];
export default routes;
