// counter 리덕스 모듈
import { createAction, handleActions } from "redux-actions";
import {
	delay,
	put,
	takeEvery,
	takeLatest,
	select,
	throttle,
} from "redux-saga/effects";

// 액션 타입 선언
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_ASYNC = "counter/INCREASE_ASYNC";
const DECREASE_ASYNC = "counter/DECREASE_ASYNC";

// 액션에 대한 액션 생성 함수 정의
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
// 마우스 클릭 이벤트가 payload 안에 들어가지 않도록
// () => undefined를 두 번째 파라미터로 넣어 줌
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
	yield delay(1000); // 1초를 기다림
	yield put(increase()); // INCREASE 액션을 디스패치
	const number = yield select((state) => state.counter); // state는 스토어 상태를 의미
	console.log(`현재 값은 ${number}입니다.`);
}

function* decreaseSaga() {
	yield delay(1000); // 1초를 기다림
	yield put(decrease()); // DECREASE 액션을 디스패치
}

export function* counterSaga() {
	// takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리
	// yield takeEvery(INCREASE_ASYNC, increaseSaga);
	// saga가 호출되는 주기 제한하기 -> 3초에 한 번
	yield throttle(3000, INCREASE_ASYNC, increaseSaga);
	// takeLatest는 기존에 진행 중이던 작업이 있다면 취소 처리하고
	// 가장 마지막으로 실행된 작업만 수행
	yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

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
