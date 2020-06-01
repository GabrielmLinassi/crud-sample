import React from "react";
import PropTypes from "prop-types";

import { Field, ErrorMessage } from "formik";

import TextField from "@material-ui/core/TextField";

// Material UI field mixed with Formik Field
export const MyTextField = ({ name, label, type }) => (
  <Field
    as={TextField}
    required
    name={name}
    label={label}
    fullWidth
    type={type}
    autoComplete="false"
    helperText={<ErrorMessage name={name} />}
  />
);

// Type checking
MyTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

// default props
MyTextField.defaultProps = {
  type: "text",
};
