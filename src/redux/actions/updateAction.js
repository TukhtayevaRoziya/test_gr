import api from "../../utilities/api";
import { getAction } from "./readAction";
import { GET_GROUP } from "./types";

export const updateAction = (path, actionType, data) => async (dispatch) => {
  try {
    const res = await api.put(`${path}`, data);

    dispatch({
      type: actionType,
      payload: res.data?.object,
    });
    dispatch(getAction("group/get/all/admin", GET_GROUP));
  } catch (err) {
    console.log(err);
  }
};
