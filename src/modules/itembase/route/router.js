import App from '../../../components-react/App/App';
import ItemBase from '../Container/ItemBase';

const routes = [
    {
        component: App,
        routes: [
            { path: '/operating-item-view/item-base', exact: true, component: ItemBase, menuUrl:'/operating-item-view/item-base'}
        ]
    }
];
export default routes;
