// 요청의 로딩 상태 관리하는 모듈

import { createAction, handleActions } from "redux-actions";

const START_LOADING = "loading/START_LOADING";
const FINISH_LOADING = "loading/FINISH_LOADING";

// 액션 생성 함수
// 요청을 위한 액션 타입을 payload로 설정(예: "sample/GET_POST")
export const startLoading = createAction(
	START_LOADING,
	(requestType) => requestType
);
export const finishLoading = createAction(
	FINISH_LOADING,
	(requestType) => requestType
);

const initialState = {};

// 리듀서 정의
const loading = handleActions(
	{
		[START_LOADING]: (state, action) => ({
			...state,
			[action.payload]: true,
		}),
		[FINISH_LOADING]: (state, action) => ({
			...state,
			[action.payload]: false,
		}),
	},
	initialState
);

export default loading;
