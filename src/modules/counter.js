// counter 리덕스 모듈
import { handleActions } from "redux-actions";

// 액션 정의
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// 액션 생성 함수 정의
// export const increase = createAction(INCREASE); // 직렬화 문제 발생함, redux-actions
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// 1초 뒤에 Increase 또는 decrease 함수를 디스패치
export const increaseAsync = () => (dispatch) => {
	setTimeout(() => {
		dispatch(increase());
	}, 1000);
};
export const decreaseAsync = () => (dispatch) => {
	setTimeout(() => {
		dispatch(decrease());
	}, 1000);
};
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
