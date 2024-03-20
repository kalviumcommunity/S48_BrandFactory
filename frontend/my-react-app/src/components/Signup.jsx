import React, { useState } from "react";
import "./styles.css";

export default function Form() {
  // State variables to manage form fields, submission status, and email validation
  const [field, setField] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  
  const [submitted, setSubmit] = useState(false);
  const [check, setCheck] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Checking if all fields are filled
    if (field.firstName && field.email && field.password && field.confirmPassword) {
      // Checking if password and confirm password match
      if (field.password === field.confirmPassword) {
        // Validating email format
        if (checkEmail(field.email)) {
          setCheck(true);
        } else {
          setCheck(false);
        }
      } else {
        setCheck(false);
      }
    }
    // Marking form as submitted
    setSubmit(true);
  };

  // Function to validate email format
  const checkEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="main">
      <div className="container">
        {/* Form component */}
        <form className="form" onSubmit={handleSubmit}>
          {/* Success message if registration is successful */}
          {submitted && check ? (
            <div className="success">Registration successful!</div>
          ) : null}

          {/* First name input field */}
          <input
            id="first-name"
            className="input"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={field.firstName}
            onChange={(e) => {
              setField({ ...field, firstName: e.target.value });
            }}
          />
          {/* Validation message for first name */}
          {submitted && !field.firstName ? <span>Please enter your Name</span> : null}

          {/* Email input field */}
          <input
            id="email"
            className="input"
            type="text"
            placeholder="Email"
            name="email"
            value={field.email}
            onChange={(e) => {
              setField({ ...field, email: e.target.value });
            }}
          />
          {/* Validation messages for email */}
          {submitted && !field.email ? <span>Please enter your email</span> : null}
          {submitted && field.email && !checkEmail(field.email) ? (
            <span>Please enter a valid email</span>
          ) : null}

          {/* Password input field */}
          <input
            id="password"
            className="input"
            type="password"
            placeholder="Password"
            name="password"
            value={field.password}
            onChange={(e) => {
              setField({ ...field, password: e.target.value });
            }}
          />
          {/* Validation message for password */}
          {submitted && !field.password ? <span>Please enter your password</span> : null}

          {/* Confirm password input field */}
          <input
            id="confirm-password"
            className="input"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={field.confirmPassword}
            onChange={(e) => {
              setField({ ...field, confirmPassword: e.target.value });
            }}
          />
          {/* Validation message for password confirmation */}
          {submitted && field.password !== field.confirmPassword ? (
            <span>Passwords do not match</span>
          ) : null}

          {/* Submit button */}
          <button className="input" id="form-button" type="submit">
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}