import App from '../../../components-react/App/App';
import SaleItemEdit from '../Container/SaleItemEdit';

const routes = [
    {
        component: App,
        routes: [
            { path: '/operating-item-view/sale-edit', exact: true, component: SaleItemEdit, menuUrl:'/operating-item-view/sale-item'}
        ]
    }
];
export default routes;
