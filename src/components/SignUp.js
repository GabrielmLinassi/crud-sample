import React from "react";
import { Link, withRouter } from "react-router-dom";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  Button,
  makeStyles,
  Container,
  Box,
  Typography,
  useMediaQuery,
} from "@material-ui/core";

import app from "./../Base";

import { MyTextField } from "./formik/TextField";
import { MySelectField } from "./formik/SelectField";
import { items } from "PositionValues";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    maxWidth: "600px",
    backgroundColor: theme.palette.background.paper,
  },
  box: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "30px 0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "5px 0 30px 0",
    padding: "0 15px",
    "& button": {
      margin: "5px",
      ["@media (min-width:600px)"]: {
        alignSelf: "flex-end",
      },
    },
  },
  inputGroup: {
    margin: "5px",
    flex: "1, 1, 100px",
  },
}));

const SignupForm = ({ history }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Box boxShadow={3} className={classes.box}>
        <Typography variant="h3" align="center" color="inherit">
          Sign Up
        </Typography>
        <Formik
          initialValues={{
            name: "",
            surname: "",
            email: "",
            password: "",
            position: "",
            photoUrl: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required("Required")
              .max(15, "Max 15 characters"),
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
              // Create the authentication user
              await app
                .auth()
                .createUserWithEmailAndPassword(values.email, values.password);

              // Save user to Firestore
              await app
                .firestore()
                .collection("users")
                .doc(app.auth().currentUser.uid)
                .set({
                  name: values.name,
                  surname: values.surname,
                  email: values.email,
                  position: values.position,
                  createdAt: app.firestore.FieldValue.serverTimestamp(),
                });

              // Reset form
              resetForm();

              // Redirect to Home
              history.push("/");
            } catch (error) {
              console.log(error, error.code, error.message);
            }
          }}
        >
          {(formik) => {
            return (
              <Form className={classes.form}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: "1 1 150px", margin: "5px" }}>
                    <MyTextField name="name" label="Name" required />
                  </div>
                  <div style={{ flex: "1 1 200px", margin: "5px" }}>
                    <MyTextField name="surname" label="Surname" required />
                  </div>
                </div>

                <div className={classes.inputGroup}>
                  <MyTextField
                    name="email"
                    label="Email"
                    type="email"
                    required
                  />
                </div>

                <div className={classes.inputGroup}>
                  <MyTextField
                    name="password"
                    label="password"
                    type="password"
                    required
                  />
                </div>

                <div className={classes.inputGroup}>
                  <MySelectField
                    name="position"
                    label="Position"
                    items={items}
                    required
                  />
                </div>

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
        <Typography variant="caption" color="inherit" align="center">
          <Link to="/login">Already have an account? Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default withRouter(SignupForm);
