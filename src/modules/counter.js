// counter 리덕스 모듈
import { createAction, handleActions } from "redux-actions";

// 액션 정의
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// 액션 생성 함수 정의
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 초기 상태 정의
const initialState = 0; // 상태는 객체일 필요 없다

// 리듀서 정의
const counter = handleActions(
	{
		[INCREASE]: (state) => state + 1,
		[DECREASE]: (state) => state - 1,
	},
	initialState
);

export default counter;
