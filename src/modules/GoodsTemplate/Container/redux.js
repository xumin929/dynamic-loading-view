const LOAD = 'DOMAIN/LOAD';
const LOAD_SUCCESS = 'DOMAIN/LOAD_SUCCESS';
const LOAD_FAIL = 'DOMAIN/LOAD_FAIL';


export default function(state = {loaded:false}, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        domains: action.result && action.result.data || [],
        loading: false,
        loaded: true
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function getDomain() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/passport/logout')
  };
}