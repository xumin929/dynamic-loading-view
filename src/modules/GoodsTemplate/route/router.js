
import App from '../../../components-react/App/App';
import GoodsTemplate from '../Container/GoodsTemplate';

const routes = [
  {
    component: App,
    routes: [
        { path: '/operating-item-view/goods-template', exact: true, component: GoodsTemplate, menuUrl : '/operating-item-view/goods-template'}
    ]
  }
];
export default routes;