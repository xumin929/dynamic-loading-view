
import App from '../../../components-react/App/App';
import IndustryLabel from '../Container/IndustryLabel';

const routes = [
  {
    component: App,
    routes: [
        { path: '/operating-item-view/industry-label', exact: true, component: IndustryLabel, menuUrl:"/operating-item-view/industry-label"}
    ]
  }
];
export default routes;