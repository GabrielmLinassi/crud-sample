import React from "react";

import { Box, Button, Typography, makeStyles } from "@material-ui/core";

import { Formik, Form } from "formik";
import { MyTextField } from "components/formik/TextField";

import * as Yup from "yup";

import app from "utils/Base";

const styles = makeStyles((theme) => ({
  box: {
    maxWidth: "700px",
    backgroundColor: theme.palette.background.paper,
    margin: "15px auto 0",
    padding: "15px 0",
  },
  form: {
    display: "flex",
    alignItems: "flex-end",
    padding: "0 15px",
  },
}));

const DeleteAccount = () => {
  const classes = styles();

  return (
    <Box boxShadow={3} className={classes.box}>
      <Formik
        initialValues={{
          password: "",
        }}
        validationSchema={Yup.object({
          password: Yup.string().required("Required!"),
        })}
        onSubmit={({ password }) => {
          // Credentials
          const Credentials = app.auth.EmailAuthProvider.credential(
            app.auth().currentUser.email,
            password
          );

          // Reauthenticate
          app
            .auth()
            .currentUser.reauthenticateWithCredential(Credentials)
            .then(() => {
              // Remove account
              app
                .auth()
                .currentUser.delete()
                .then(() => {
                  alert("Account deleted Sucessfully!");
                })
                .catch((err) => {
                  alert("Couldn't remove account");
                  console.log("Error removing account:", err);
                });
            })
            .catch((err) => {
              alert("Password is Invalid");
              console.log("reauthenticateWithCredential Error:", err);
            });
        }}
      >
        {(formik) => (
          <Form className={classes.form}>
            <div style={{ margin: "5px", flex: "1" }}>
              <MyTextField
                name="password"
                label="Password"
                required
                type="password"
              />
            </div>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              style={{}}
            >
              DELETE ACCOUNT
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default DeleteAccount;
