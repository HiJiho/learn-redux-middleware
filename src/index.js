import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer, { rootSaga } from "./modules";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { thunk } from "redux-thunk";
import createSagaMiddleware from "redux-saga";

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(logger, thunk, sagaMiddleware),
	devTools: process.env.NODE_ENV !== "production", // 개발 환경에서만 DevTools 활성화
});

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
