import { combineReducers } from "@reduxjs/toolkit";
import employeeSlice from "./slice/employeeSlice";
import { AXIOS_DISPATCH_EVENT_TYPE } from "@/shared/constants/constant";

const rootReducer = (state: any, action: any) => {
  if (action.type === AXIOS_DISPATCH_EVENT_TYPE.RESET_STATE) {
    const { userProfile, general } = state;
    state = {
      userProfile,
      general: {
        ...general,
        isSettingsMenu: general?.isSettingsMenu ?? false,
        isSideBarCollapse: general?.isSideBarCollapse ?? true,
        isSideBarToggleButtonShow: general?.isSideBarToggleButtonShow ?? true,
      },
    };
  }
  if (action.type === AXIOS_DISPATCH_EVENT_TYPE.LOGOUT) {
    state = {};
  }
  return appReducer(state, action);
};

const appReducer = combineReducers({
  // Add your reducers here
  employees: employeeSlice,
});

export default rootReducer;
