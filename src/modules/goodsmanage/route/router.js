
import App from '../../../components-react/App/App';
import GoodsManage from '../Container/GoodsManage';

const routes = [
  {
    component: App,
    routes: [
        { path: '/operating-item-view/goodsmanage', exact: true, component: GoodsManage, menuUrl:"/operating-item-view/goodsmanage"}
    ]
  }
];
export default routes;