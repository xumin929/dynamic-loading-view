import App from '../../../components-react/App/App';
import SellGoods from '../Container/SellGoods';

const routes = [
    {
        component: App,
        routes: [
            { path: '/operating-item-view/sale-item', exact: true, component: SellGoods, menuUrl:'/operating-item-view/sale-item'}
        ]
    }
];
export default routes;
