import React, { useContext } from "react";
import { Redirect } from "react-router";

import { Formik, Form } from "formik";
import { MyTextField } from "./Formik/TextField";
import * as Yup from "yup";

import Button from "@material-ui/core/Button";

import app from "./../Base";
import { AuthContext } from "./../Auth";

const Login = ({ history }) => {
  return (
    <div className="app">
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email("Invalid Email").required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={async (values, action) => {
          try {
            await app
              .auth()
              .signInWithEmailAndPassword(values.email, values.password);
            history.push("/");
          } catch (error) {
            alert(error);
          }
        }}
      >
        {(formik) => {
          const { currentUser } = useContext(AuthContext);

          if (currentUser) {
            return <Redirect to="/" />;
          }

          return (
            <Form>
              <MyTextField name="email" label="Email" type="email" />
              <MyTextField name="password" label="Password" type="password" />
              <Button
                type="submit"
                disabled={
                  formik.isSubmitting || !formik.dirty || !formik.isValid
                }
                variant="contained"
                color="primary"
              >
                LOGIN
              </Button>
            </Form>
          );
        }}
      </Formik>
      <a href="/signup">Don't have an account? Sign Up</a>
    </div>
  );
};

export default Login;
