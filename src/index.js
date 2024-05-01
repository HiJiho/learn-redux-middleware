import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./modules";
import { Provider } from "react-redux";

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== "production", // 개발 환경에서만 DevTools 활성화
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
