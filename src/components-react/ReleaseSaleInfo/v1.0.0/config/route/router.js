
import App from '../../../../AppConfig/App';
import ReleaseSaleInfoConfig from '../Container/ReleaseSaleInfoConfig';

const routes = [
  
  {
    component: App,
    exact: false,
    routes: [
      { path: '/item-shop-view/configs/components-react/ReleaseSaleInfo/v1.0.0', exact: false, component: ReleaseSaleInfoConfig }
    ]
  }
];

export default routes;