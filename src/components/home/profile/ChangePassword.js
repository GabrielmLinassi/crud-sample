import React from "react";

import { Formik, Form } from "formik";
import { Box, Button, makeStyles } from "@material-ui/core";
import { MyTextField } from "components/formik/TextField";

import * as Yup from "yup";

import app from "../../../Base";

const useStyles = makeStyles((theme) => ({
  box: {
    maxWidth: "700px",
    backgroundColor: theme.palette.background.paper,
    margin: "15px auto 0",
    padding: "15px 0",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    padding: "15px",
  },
  textfield: {
    flex: "1 1 150px",
    "&+&": {
      marginLeft: "5px",
    },
  },
  button: {
    marginLeft: "5px",
  },
}));

const ChangePassword = (props) => {
  const classes = useStyles();

  return (
    <Box boxShadow={3} className={classes.box}>
      <Formik
        enableReinitialize
        initialValues={{
          password: "",
          new_password: "",
          confirm_password: "",
        }}
        validationSchema={Yup.object({
          password: Yup.string().required("Current password is required"),
          new_password: Yup.string().required("Password is required"),
          confirm_password: Yup.string()
            .oneOf([Yup.ref("new_password"), null], "Passwords don't match")
            .required("Password confirm is required"),
        })}
        onSubmit={({ password, new_password }, { setSubmitting }) => {
          app
            .auth()
            .currentUser.reauthenticateWithCredential(
              app.auth.EmailAuthProvider.credential(
                app.auth().currentUser.email,
                password
              )
            )
            .then(() => {
              app
                .auth()
                .currentUser.updatePassword(new_password)
                .then(() => {
                  alert("Password changed successfully");
                })
                .catch((err) => {
                  console.log(err.message); // couldnt change password
                });
            })
            .catch((err) => {
              console.log("Error on reauthentication:", err.message); // current password wrong
              setSubmitting(false);
            });
        }}
      >
        {(formik) => {
          return (
            <Form className={classes.form}>
              <div className={classes.textfield}>
                <MyTextField
                  name="password"
                  label="Current Password"
                  type="password"
                />
              </div>
              <div className={classes.textfield}>
                <MyTextField
                  name="new_password"
                  label="New Password"
                  type="password"
                />
              </div>
              <div className={classes.textfield}>
                <MyTextField
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
                disabled={
                  !formik.dirty || !formik.isValid || formik.isSubmitting
                }
              >
                SAVE
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default ChangePassword;
