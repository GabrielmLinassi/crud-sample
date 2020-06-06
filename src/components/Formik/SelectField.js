import React from "react";
import PropTypes from "prop-types";

import { Field, ErrorMessage } from "formik";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// Material UI field mixed with Formik Field
export const MySelectField = ({ name, label, items, required = false }) => {
  return (
    <FormControl fullWidth required={required}>
      <InputLabel>{label}</InputLabel>
      <Field as={Select} name={name}>
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Field>
      <FormHelperText>{<ErrorMessage name={name} />}</FormHelperText>
    </FormControl>
  );
};

// Prop checking
MySelectField.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};
