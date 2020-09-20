import { APPBAR_PAGE_NAME } from "../constants";

export const appBarName = (pageName) => {
  return (dispatch) => {
    dispatch({
      type: APPBAR_PAGE_NAME,
      payload: pageName,
    });
  };
};
