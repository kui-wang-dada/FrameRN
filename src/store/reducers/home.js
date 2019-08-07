import * as home from "../actions/home";

const DEFAULT_STATE = {
  homeData: {},

  newDetailData: {}
};

export default function(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case home.HOME_DATA:
      return { ...state, ...action.payload };

    case home.NEW_DETAIL_DATA:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
