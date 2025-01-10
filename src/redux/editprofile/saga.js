import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../utils/axios";
import { updateProfileRequest, updateProfileSuccess, updateProfileFailure } from "./slice";
import { apiConfig } from "../../utils/apiConfig";

// Worker Saga for updating profile
function* updateProfileSaga(action) {
    try {
      const { id, profileData } = action.payload;
  
      // Prepare FormData
      const formData = new FormData();
  
      // Only append image if it exists
      if (profileData.image) {
        formData.append("image", profileData.image);
      }
  
      formData.append("firstName", profileData.firstName);
      formData.append("email", profileData.email);
      
      // Sending addresses as JSON string if it's an array
      formData.append("addresses", JSON.stringify(profileData.addresses)); 
      
      formData.append("mobile", profileData.mobile);
      
      // Format the date of birth if necessary
      const formattedDate = moment(profileData.date_of_birth).format('DD/MM/YYYY');
      formData.append("date_of_birth", formattedDate);
  
      formData.append("country", profileData.country);
  
      // Make API request
      const response = yield call(
        axios.put,
        `${apiConfig.editprofile}/${id}`, 
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      if (response.status === 200) {
        yield put(updateProfileSuccess(response.data)); 
      } else {
        yield put(updateProfileFailure("Failed to update profile"));
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
      yield put(updateProfileFailure(errorMessage));
    }
  }
  
// Watcher Saga
export function* watchUpdateProfile() {
  yield takeLatest(updateProfileRequest.type, updateProfileSaga);
}
