import React from "react";
import { withRouter } from "react-router";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";

import app from "./../Base";

import { MyTextField } from "./Formik/TextField";
import { MySelectField } from "./Formik/SelectField";
import { items } from "../PositionValues";

const SignupForm = ({ history }) => {
  return (
    <div className="app">
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          email: "",
          password: "",
          position: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required").max(15, "Max 15 characters"),
          surname: Yup.string()
            .required("Required")
            .max(20, "Max 20 characters"),
          email: Yup.string().email("Invalid email").required("Required"),
          password: Yup.string().required("Required"),
          position: Yup.string()
            .oneOf(["front_end", "back_end", "devops", "qa"])
            .required("Required"),
        })}
        onSubmit={async (values, { resetForm }) => {
          try {
            await app
              .auth()
              .createUserWithEmailAndPassword(values.email, values.password);
            resetForm();
            history.push("/");
          } catch (error) {
            alert(error);
          }
        }}
      >
        {(formik) => {
          return (
            <Form>
              <MyTextField name="name" label="Name" />
              <MyTextField name="surname" label="Surname" />
              <MyTextField name="email" label="Email" type="email" />
              <MyTextField name="password" label="password" type="password" />
              <MySelectField name="position" label="Position" items={items} />

              <Button
                type="submit"
                disabled={
                  !formik.dirty || !formik.isValid || formik.isSubmitting
                }
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
      <a href="/login">Already have an account? Login</a>
    </div>
  );
};

export default withRouter(SignupForm);
