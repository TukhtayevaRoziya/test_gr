import api from "../../utilities/api";

export const deleteAction = (path, actionType, id) => async (dispatch) => {
    try {
      const res = await api.delete(`${path}?groupId=${id}`);
      dispatch({
        type: actionType,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };