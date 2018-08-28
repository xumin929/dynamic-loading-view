
import App from '../../../components-react/App/App';
import EvaluationManage from '../Container/EvaluationManage';

const routes = [
  {
    component: App,
    routes: [
        { path: '/operating-item-view/evaluation-manage', exact: true, component: EvaluationManage, menuUrl:"/operating-item-view/evaluation-manage"}
    ]
  }
];
export default routes;