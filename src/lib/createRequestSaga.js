import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "../modules/loading";

// type: 액션 타입(GET_POST, ...), request: api 요청(api.getPost, ...)
export default function createRequestSaga(type, request) {
	const SUCCESS = `${type}_SUCCESS`;
	const FAILURE = `${type}_FAILURE`;

	return function* (action) {
		yield put(startLoading(type)); // 로딩 시작
		try {
			const response = yield call(request, action.payload);
			yield put({
				type: SUCCESS,
				payload: response.data,
			});
		} catch (e) {
			yield put({
				type: FAILURE,
				payload: e,
				error: true,
			});
		}
		yield put(finishLoading(type)); // 로딩 끝
	};
}
