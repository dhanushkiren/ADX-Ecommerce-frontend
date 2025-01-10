import authReducer from "./auth/authSlice";
import editProfileReducer from "./editprofile/slice"

const rootReducer = {
  auth: authReducer,
  editProfile: editProfileReducer,
};

export default rootReducer;