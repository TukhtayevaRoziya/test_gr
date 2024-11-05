import { DELETE_GROUP, GET_GROUP, UPDATE_GROUP, CREATE_GROUP } from '../actions/types';

const initialState = {
  data: []
};

const GroupReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_GROUP:
      return {
        ...state,
        data: payload
      };
    case UPDATE_GROUP:
      return {
        ...state,
        data: payload
      };
    case DELETE_GROUP:
      return {
        ...state,
        data: payload
      };
      case CREATE_GROUP:
        return {
          ...state,
          data: payload
        };
    default:
      return state;
  }
};

export default GroupReducer;