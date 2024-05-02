// api 요청하는 thunk 함수를 생성하는 함수
// 기존 thunk 함수 리팩토링

export default function createRequestThunk(type, request) {
	// 성공 및 실패 액션 타입 정의
	const SUCCESS = `${type}_SUCCESS`;
	const FAILURE = `${type}_FAILURE`;

	return (params) => async (dispatch) => {
		dispatch({ type }); // 요청 시작
		try {
			const response = await request(params);
			dispatch({
				type: SUCCESS,
				payload: response.data,
			}); // 요청 성공
		} catch (e) {
			dispatch({
				type: FAILURE,
				payload: e,
				error: true,
			}); // 에러 발생
			throw e;
		}
	};
}

// 사용법: createRequestThunk('GET_USERS', api.getUsers);
