import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux"
import { createStore, compose, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"

import dataReducer from "./store/reducers/dashboardData"
import dashboardSaga from "./store/sagas/sagas"

// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const composeEnhancers = compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(dataReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(dashboardSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("aviasales-dashboard"));
