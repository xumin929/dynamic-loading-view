

// const SALE_ADDRESS_LOAD = 'SALE_ADDRESS_LOAD';
// const SALE_ADDRESS_SUCCESS = 'SALE_ADDRESS_SUCCESS';
// const SALE_ADDRESS_FAIL = 'SALE_ADDRESS_FAIL';

// export default function (state={},action={}){
//     switch(action.type){
//         case SALE_ADDRESS_LOAD:
//         return {
//             ...state,
//             loading: true
//           };
//         case SALE_ADDRESS_SUCCESS:
//             return {
//               ...state,
//               loading: false,
//               loaded: true,
//               data: action.result
//             };
//         case SALE_ADDRESS_FAIL:
//             return {
//               ...state,
//               loading: false,
//               loaded: true,
//               error: action.msg
//             };
//         default:
//             return state
//     }
// }

// export function getAddressInfo (param) {
//     return {
//       types: [SALE_ADDRESS_LOAD, SALE_ADDRESS_SUCCESS, SALE_ADDRESS_FAIL],
//       promise: (client) => client.get('/shop/seller/address/queryShopInfoAddress', {params: param})
//     };
//   }