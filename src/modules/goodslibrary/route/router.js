import App from '../../../components-react/App/App';
import GoodsLibrary from '../Container/GoodsLibrary';
import EditLibrary from '../Container/EditLibrary';
import AddLibrary from '../Container/AddLibrary';

const routes = [
    {
        component: App,
        routes: [
            {
                path: '/operating-item-view/goodslibrary/add-library',
                exact: true,
                component: AddLibrary,
                menuUrl:'/operating-item-view/goodslibrary/goodslibrary'
            },
            {
                path: '/operating-item-view/goodslibrary/edit-library',
                exact: true,
                component: EditLibrary,
                menuUrl:'/operating-item-view/goodslibrary/goodslibrary'
            },
            {
                path: '/operating-item-view/goodslibrary/goodslibrary',
                exact: true,
                component: GoodsLibrary,
                menuUrl:'/operating-item-view/goodslibrary/goodslibrary'
            },
        ]
    }
];
export default routes;
