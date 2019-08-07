import $api from "@/plugins/api";

export * from "./home";

export function doAction(
  params,
  url,
  dispatchType,
  stateData,
  model,
  replaceUrl
) {
  console.log("e", params, url, dispatchType, stateData, model, replaceUrl);
  return dispatch => {
    return new Promise((resolve, reject) => {
      $api[url](params, replaceUrl)
        .then(res => {
          let newRes;
          if (model) {
            newRes = model(res.data.display);
          } else {
            newRes = res.data.display;
          }
          let reducer = {
            type: "",
            payload: {}
          };
          reducer.type = dispatchType;

          reducer.payload[stateData] = newRes;

          dispatch(reducer);
          resolve(newRes);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
}

// export function clearState(key, state) {
//   return dispatch => {
//     let reducer = {
//       type: key,
//       payload: {}
//     };
//     reducer.payload[state] = {};
//     console.log("reducer,reducer", reducer);
//     dispatch(reducer);
//   };
// }
