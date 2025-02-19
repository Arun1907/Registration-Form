import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField, setErrors, submitForm } from "../redux/formSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    dateOfBirth,
    errors,
    submitted,
  } = useSelector((state) => state.form);

  const validate = () => {
    let errors = {};
    if (!firstName) errors.firstName = "First Name is required";
    if (!lastName) errors.lastName = "Last Name is required";
    if (!email) errors.email = "Email is required";
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      errors.email = "Invalid email format";
    if (!password) errors.password = "Password is required";
    else if (password.length < 8)
      errors.password = "Password must be at least 8 characters";
    if (confirmPassword !== password)
      errors.confirmPassword = "Passwords must match";
    if (!dateOfBirth) errors.dateOfBirth = "Date of Birth is required";
    else {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) errors.dateOfBirth = "Must be 18 years old";
    }
    dispatch(setErrors(errors));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(
        submitForm({ firstName, lastName, email, password, dateOfBirth })
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Registration Form</h2>
          {submitted && (
            <div className="alert alert-success">Registration Successful!</div>
          )}
          <form onSubmit={handleSubmit}>
            {[
              "firstName",
              "lastName",
              "email",
              "password",
              "confirmPassword",
              "dateOfBirth",
            ].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label"></label>
                {field.charAt(0).toUpperCase() +
                  field.slice(1).replace(/([A-Z])/g, " $1")}
                <input
                  type={
                    field === "password" || field === "confirmPassword"
                      ? "password"
                      : field === "dateOfBirth"
                      ? "date"
                      : "text"
                  }
                  className="form-control"
                  value={eval(field)}
                  onChange={(e) =>
                    dispatch(updateField({ field, value: e.target.value }))
                  }
                />

                {errors[field] && (
                  <small className="text-danger">{errors[field]}</small>
                )}
              </div>
            ))}
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
