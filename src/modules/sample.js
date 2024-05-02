/**
 * smaple 리듀서
 * lib/api.js 사용해 데이터 받고, 상태 관리
 */
import { handleActions } from "redux-actions";
import * as api from "../lib/api";
import createRequestThunk from "../lib/createRequestThunk";

// 액션 타입 선언
// 한 요청당 세 개를 만들어야 함

const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

// thunk 함수 생성
// thunk 함수 내부에서 시작, 성공, 실패 각각 다른 액션을 디스패치

export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

// 초기 상태를 선언
// 요청의 로딩 중에는 loading이라는 객체에서 관리

const initialState = {
	loading: {
		GET_POST: false,
		GET_USERS: false,
	},
	post: null,
	users: null,
};

// 리듀서 정의
const sample = handleActions(
	{
		[GET_POST]: (state) => ({
			...state,
			loading: {
				...state.loading,
				GET_POST: true, // 요청 시작
			},
		}),
		[GET_POST_SUCCESS]: (state, action) => ({
			...state,
			loading: {
				...state.loading,
				GET_POST: false, // 요청 완료
			},
			post: action.payload,
		}),
		[GET_POST_FAILURE]: (state, action) => ({
			...state,
			loading: {
				...state.loading,
				GET_POST: false, // 요청 완료
			},
		}),
		[GET_USERS]: (state) => ({
			...state,
			loading: {
				...state.loading,
				GET_USERS: true, // 요청 시작
			},
		}),
		[GET_USERS_SUCCESS]: (state, action) => ({
			...state,
			loading: {
				...state.loading,
				GET_USERS: false, // 요청 완료
			},
			users: action.payload,
		}),
		[GET_USERS_FAILURE]: (state, action) => ({
			...state,
			loading: {
				...state.loading,
				GET_USERS: false, // 요청 완료
			},
		}),
	},
	initialState
);

export default sample;
