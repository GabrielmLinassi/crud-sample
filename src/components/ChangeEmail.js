import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import { Box, Button, Typography, makeStyles } from "@material-ui/core";
import { MyTextField } from "./Formik/TextField";

import app from "./../Base";

const useStyles = makeStyles((theme) => ({
  box: {
    maxWidth: "700px",
    backgroundColor: theme.palette.background.paper,
    margin: "15px auto 0",
    padding: "15px 0",
  },
  form: {
    display: "flex",
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
      {/* <Typography variant="h5" color="inherit" align="center">
        Change Email
      </Typography> */}
      <Formik
        enableReinitialize
        initialValues={{
          email: email || "",
        }}
        onSubmit={({ email }) => {
          app
            .auth()
            .currentUser.updateEmail(email)
            .then(() => {
              setEmail(app.auth().currentUser.email);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {(formik) => {
          return (
            <Form className={classes.form}>
              <MyTextField name="email" label="Email" type="email" />
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

export default ChangeEmail;
