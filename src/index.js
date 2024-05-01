import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./modules";
import { Provider } from "react-redux";
import loggerMiddleware from "./lib/loggerMiddleware";
import { createLogger } from "redux-logger";

const logger = createLogger();
const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	devTools: process.env.NODE_ENV !== "production", // 개발 환경에서만 DevTools 활성화
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
