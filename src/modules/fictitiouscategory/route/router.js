
import App from '../../../components-react/App/App';
import FictitiousCategory from '../Container/FictitiousCategory';

const routes = [
  {
    component: App,
    routes: [
        { path: '/operating-item-view/fictitious-category', exact: true, component: FictitiousCategory, menuUrl:"/operating-item-view/fictitious-category"}
    ]
  }
];
export default routes;