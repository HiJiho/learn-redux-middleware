// api 요청하는 thunk 함수를 생성하는 함수
// 기존 thunk 함수 리팩토링

import { finishLoading, startLoading } from "../modules/loading";

export default function createRequestThunk(type, request) {
	// 성공 및 실패 액션 타입 정의
	const SUCCESS = `${type}_SUCCESS`;
	const FAILURE = `${type}_FAILURE`;

	return (params) => async (dispatch) => {
		dispatch({ type }); // 요청 시작
		dispatch(startLoading(type));
		try {
			const response = await request(params);
			dispatch({
				type: SUCCESS,
				payload: response.data,
			}); // 요청 성공
			dispatch(finishLoading(type));
		} catch (e) {
			dispatch({
				type: FAILURE,
				payload: e,
				error: true,
			}); // 에러 발생
			dispatch(finishLoading(type));
			throw e;
		}
	};
}

// 사용법: createRequestThunk('GET_USERS', api.getUsers);
