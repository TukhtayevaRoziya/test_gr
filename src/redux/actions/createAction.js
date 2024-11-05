import api from "../../utilities/api";
import { getAction } from "./readAction";
import { GET_GROUP } from "./types";

export const createAction =
  (path, actionType, formData) => async (dispatch) => {
    try {
      const res = await api.post(path, formData);
      dispatch({
        type: actionType,
        payload: res.data?.object,
      });

      dispatch(getAction("group/get/all/admin", GET_GROUP));

    } catch (err) {
      console.log(err);
    }
  };