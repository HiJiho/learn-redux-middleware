/**
 * smaple 리듀서
 * lib/api.js 사용해 데이터 받고, 상태 관리
 */
import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api";
import { finishLoading, startLoading } from "./loading";

// 액션 타입 선언
const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);

// getPost가 호출될 때 실행 할 saga
function* getPostSaga(action) {
	// action.payload: 전달된 id 값
	yield put(startLoading(GET_POST)); // 로딩 시작
	// 파라미터로 action을 받아 오면 액션의 정보를 조회 가능
	try {
		// call을 사용하면 Promise를 반환하는 함수를 호출하고, 기다릴 수 있다
		// 첫 번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수
		const post = yield call(api.getPost, action.payload); // api.getPost(action.payload) 의미
		yield put({
			type: GET_POST_SUCCESS, // GET_POST_SUCCESS 액션을 디스패치
			payload: post.data, // action.payload = post.data(-> api.getPost 요청 결과)
		});
	} catch (e) {
		// try-catch 문을 사용해 에러도 잡을 수 있다
		yield put({
			type: GET_POST_FAILURE,
			payload: e,
			error: true,
		});
	}
	yield put(finishLoading(GET_POST)); // 로딩 완료
}

// getUsers가 호출될 때 실행할 saga
function* getUsersSaga() {
	yield put(startLoading(GET_USERS));
	try {
		const users = yield call(api.getUsers);
		yield put({
			type: GET_USERS_SUCCESS,
			payload: users.data,
		});
	} catch (e) {
		yield put({
			type: GET_USERS_FAILURE,
			payload: e,
			error: true,
		});
		yield put(finishLoading(GET_USERS));
	}
}

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
