import React, { Component } from "react";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";

import user from "./reducers/user";
import home from "./reducers/home";
import service from "./reducers/service";
import my from "./reducers/my";
import search from "./reducers/search";

const logger = createLogger();

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["search"]
};

const reducers = combineReducers({ user, home, service, my, search });

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(thunk, logger));

export class StoreProvider extends Component {
  constructor(props) {
    super(props);
  }
  state = { persistIsFinish: false };
  componentWillMount() {
    persistStore(store, {}, () => {
      this.setState({ persistIsFinish: true });
    });
  }
  render() {
    if (!this.state.persistIsFinish) return null;
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default store;
