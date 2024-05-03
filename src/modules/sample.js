/**
 * smaple 리듀서
 * lib/api.js 사용해 데이터 받고, 상태 관리
 */
import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api";
import createRequestSaga from "../lib/createRequestSaga";

// 액션 타입 선언
const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";

export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);

// getPost, getUsers가 호출될 때 실행할 saga
const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

// 사가 리스너, 사가 미들웨어에 의해 모니터링 중
// 모니터링 되는 액션 타입: GET_POST, GET_USERS
export function* sampleSaga() {
	yield takeLatest(GET_POST, getPostSaga);
	yield takeLatest(GET_USERS, getUsersSaga);
}

// 초기 상태를 선언
// 요청의 로딩 중에는 loading이라는 객체에서 관리 -> loading 모듈로 분리
const initialState = {
	post: null,
	users: null,
};

// 리듀서 정의
const sample = handleActions(
	{
		[GET_POST_SUCCESS]: (state, action) => ({
			...state,
			post: action.payload, // 포스트 데이터를 스토어 상태에 저장
		}),
		[GET_USERS_SUCCESS]: (state, action) => ({
			...state,
			users: action.payload,
		}),
	},
	initialState
);

export default sample;
