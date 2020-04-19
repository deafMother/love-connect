import React from "react";
import { useFormik } from "formik";
import { register } from "../../actions";
import { connect } from "react-redux";

const validate = (values) => {
  const errors = {};
  if (!values.password) {
    errors.password = "password pequired";
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = "password required";
  }

  if (!values.email) {
    errors.email = "email required";
  }
  return errors;
};

const Signup = ({ register }) => {
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
      passwordConfirm: "",
    },
    validate,
    onSubmit: (values) => {
      register(values);
    },
  });
  return (
    <div className="form">
      <h3>Signup</h3>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            id="signup-email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
          <input
            id="signup-password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passwordConfirm}
            placeholder="confirm password"
          />
          {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
            <div className="error">{formik.errors.passwordConfirm}</div>
          ) : null}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default connect(null, { register })(Signup);
