import App from '../../../components-react/App/App';
import GoodsRlease from '../Container/GoodsRlease';

const routes = [
    {
        component: App,
        routes: [
            { path: '/operating-item-view/goods-release', exact: true, component: GoodsRlease, menuUrl:'/operating-item-view/goods-release'}
        ]
    }
];
export default routes;
