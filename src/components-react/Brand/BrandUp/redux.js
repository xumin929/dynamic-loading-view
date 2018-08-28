/*
 * author:ZhangHongJie
 * date:2017-02-14
 * description:brandup
 *
 */
const PICUP = 'item/brand/PICUP';
const PICUP_SUCCESS = 'item/brand/PICUP_SUCCESS';
const PICUP_FAIL = 'item/brand/PICUP_FAIL';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case PICUP:
      return {
        ...state,
        loading: true
      };
    case PICUP_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case PICUP_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };

    default:
      return state
  }
}

export function brandup (platformId, pictures) {
  return {
    types: [PICUP, PICUP_SUCCESS, PICUP_FAIL],
    promise: (client) => client.post('/base/upload/uploadImgFile', {data:{platformId, pictures}})
  }
}


// export function getBase64 (img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
//   // console.log(brandup());
//   brandup(2,reader)
//     .then(function(data){console.log(data.pictureURL)})
// }
//
// export function beforeUpload (file) {
//   const isJPG = file.type === 'image/jpeg';
//   if (!isJPG) {
//     message.error('You can only upload JPG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJPG && isLt2M;
// }

