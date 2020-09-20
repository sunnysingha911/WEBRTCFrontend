import { APPBAR_PAGE_NAME } from "../constants";

const initialValue = {
  pageName: null,
};

const pageName = (state = initialValue, action) => {
  switch (action.type) {
    case APPBAR_PAGE_NAME:
      return {
        ...state,
        pageName: action.payload,
      };
    default:
      return state;
  }
};

export default pageName;
