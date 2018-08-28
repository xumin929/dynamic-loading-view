import App from '../../../components-react/App/App';
import SupplyAudit from '../Container/SupplyAudit';

const routes = [
    {
        component: App,
        routes: [
            { path: '/operating-item-view/supply-audit', exact: true, component: SupplyAudit, menuUrl:'/operating-item-view/supply-audit'}
        ]
    }
];
export default routes;
