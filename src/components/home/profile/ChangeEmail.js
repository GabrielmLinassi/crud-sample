import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import { Box, Button, Typography, makeStyles } from "@material-ui/core";
import { MyTextField } from "components/formik/TextField";

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
  button: {
    marginLeft: "5px",
  },
}));

const ChangeEmail = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(app.auth().currentUser.email);
  }, []);

  return (
    <Box boxShadow={3} className={classes.box}>
      <Typography
        variant="subtitle1"
        color="inherit"
        align="left"
        style={{ padding: "0 15px" }}
      >
        Change Email
      </Typography>
      <Formik
        enableReinitialize
        initialValues={{
          email: email || "",
          password: "",
        }}
        onSubmit={({ password, email }) => {
          const credentials = app.auth.EmailAuthProvider.credential(
            app.auth().currentUser.email,
            password
          );

          app
            .auth()
            .currentUser.reauthenticateWithCredential(credentials)
            .then(() => {
              app
                .auth()
                .currentUser.updateEmail(email)
                .then(() => {
                  setEmail(email);
                  alert(`Email changed to "${email}" sucessfully!`);
                })
                .catch((err) => {
                  alert(err.message);
                  console.log(err);
                });
            })
            .catch((err) => {
              alert("Password Invalid");
              console.log(err);
            });
        }}
      >
        {(formik) => {
          return (
            <Form className={classes.form}>
              <div style={{ flex: "1 1 150px", margin: "5px" }}>
                <MyTextField name="password" label="Password" type="password" />
              </div>
              <div style={{ flex: "1 1 150px", margin: "5px" }}>
                <MyTextField name="email" label="Email" type="email" />
              </div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
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

export default ChangeEmail;
