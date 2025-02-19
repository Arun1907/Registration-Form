import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  dateOfBirth: "",
  errors: {},
  submitted: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    submitFormSuccess: (state) => {
      return { ...initialState, submitted: true };
    },
    resetSubmitted: (state) => {
      state.submitted = false;
    },
  },
});

export const { updateField, setErrors, submitFormSuccess, resetSubmitted } = formSlice.actions;

export const submitForm = (formData) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:5000/register", formData);
    if (response.status === 200) {
      dispatch(submitFormSuccess());
      setTimeout(() => dispatch(resetSubmitted()), 5000);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

export default formSlice.reducer;
