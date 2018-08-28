import {getStore} from "jdcloudecc/redux/create";
export default reducers => ComposedComponent => {
  const {inject} = getStore();
  inject(reducers);
  return ComposedComponent;
};
