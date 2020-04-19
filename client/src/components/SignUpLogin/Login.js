import React from "react";
import { useFormik } from "formik";
import { login } from "../../actions";
import { connect } from "react-redux";

const validate = (values) => {
  const errors = {};
  if (!values.password) {
    errors.password = "password required";
  }

  if (!values.email) {
    errors.email = "email required";
  }
  return errors;
};

const LogIn = ({ login }) => {
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validate,
    onSubmit: (values) => {
      login(values);
    },
  });
  return (
    <div className="form">
      <h3>Login</h3>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            id="email"
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
            id="password"
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
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default connect(null, { login })(LogIn);
