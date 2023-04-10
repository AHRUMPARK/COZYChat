interface Alert {
  content: string;
  date: string;
  time: string;
}
const initalState: Alert[] = [];
// 액션 타입
export const ADD = 'ADD';

// 액션 함수 생성
// payload에는 공지 메세지 받아오고싶다.
export function add(payload: any) {
  return {
    type: ADD,
    payload,
  };
}

// 리듀서
export default function notice(state = initalState, action: any) {
  switch (action.type) {
    case ADD:
      console.log('------------------');
      console.log(state);
      console.log(action.payload);
      console.log('------------------');
      const newState = [...state];
      newState.push(action.payload);
      return newState;

    default:
      return state;
  }
}
