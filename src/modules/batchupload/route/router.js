
import App from '../../../components-react/App/App';
import BatchUpload from '../Container/BatchUpload';

const routes = [
  {
    component: App,
    routes: [
        { path: '/operating-item-view/batch-upload/upload', exact: true, component: BatchUpload, menuUrl:"/operating-item-view/batch-upload/upload"}
    ]
  }
];
export default routes;