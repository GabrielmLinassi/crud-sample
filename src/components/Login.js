import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import { Formik, Form } from "formik";
import { MyTextField } from "./Formik/TextField";
import * as Yup from "yup";

import {
  Button,
  makeStyles,
  Container,
  Typography,
  Box,
} from "@material-ui/core";

import app from "./../Base";
import { AuthContext } from "./../Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    maxWidth: "400px",
    backgroundColor: theme.palette.background.paper,
  },
  box: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "300px",
    padding: "30px 0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "5px 0 30px 0",
    padding: "0 15px",
  },
  inputGroup: {
    margin: "5px 0",
  },
}));

const Login = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Box boxShadow={3} className={classes.box}>
        <Typography variant="h3" align="center" color="inherit">
          Login
        </Typography>
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
            if (currentUser) {
              return <Redirect to="/" />;
            }

            return (
              <Form className={classes.form}>
                <div className={classes.inputGroup}>
                  <MyTextField name="email" label="Email" type="email" />
                </div>
                <div className={classes.inputGroup}>
                  <MyTextField
                    name="password"
                    label="Password"
                    type="password"
                  />
                </div>
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
        <Typography variant="caption" color="inherit" align="center">
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
