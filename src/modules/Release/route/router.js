
import App from '../../../components-react/App/App';
import Release from '../Container/Release';

const routes = [
  {
    component: App,
    routes: [
        { path: '/operating-item-view/product-release', exact: true, component: Release, menuUrl:'/operating-item-view/product-release' }
    ]
  }
];
export default routes;