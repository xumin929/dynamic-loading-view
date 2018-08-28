import App from '../../../components-react/App/App';
import EditGoods from '../Container/EditGoods';

const routes = [
    {
        component: App,
        routes: [
            { path: '/operating-item-view/edit-goods', exact: true, component: EditGoods, menuUrl:'/operating-item-view/item-base'}
        ]
    }
];
export default routes;
