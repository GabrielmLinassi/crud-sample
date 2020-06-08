import "typeface-roboto";

import React, { useContext, useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import {
  Typography,
  Button,
  CircularProgress,
  Backdrop,
  makeStyles,
  Container,
} from "@material-ui/core";

import { Formik, Form } from "formik";
import { MyTextField } from "components/formik/TextField";
import { MySelectField } from "components/formik/SelectField";

import { items } from "utils/PositionValues";

import { AuthContext } from "utils/Auth";
import app from "utils/Base";

import ChangeEmail from "./profile/ChangeEmail";
import ChangePassword from "./profile/ChangePassword";
import DeleteAccount from "./profile/DeleteAccount";

//------
const useStyles = makeStyles((theme) => ({
  box: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    maxWidth: "700px",
    margin: "15px auto 0",
    padding: "15px 0",
  },
  backdrop: {
    display: "none",
    position: "absolute",
    zIndex: 999,
  },
  form: {
    padding: "15px",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "15px auto 0",
    "& button": {
      marginLeft: "5px",
    },
  },
}));

const Profile = (props) => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(true);

  const { currentUser } = useContext(AuthContext);

  const classes = useStyles();

  // get user info from firestore
  useEffect(() => {
    app
      .firestore()
      .collection("users")
      .doc(app.auth().currentUser.uid)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return;
        }
        setData(doc.data(), setOpen(false));
      });
  }, []);

  return (
    <Container>
      <Box boxShadow={3} className={classes.box}>
        <Backdrop open={open} className={classes.backdrop}>
          <CircularProgress />
        </Backdrop>
        <Typography variant="h3" color="inherit" align="center">
          Profile
        </Typography>
        <div>
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: data.name || "",
              surname: data.surname || "",
              email: data.email || "",
              position: data.position || "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);

              /* Update data on Firestore */
              await app
                .firestore()
                .collection("users")
                .doc(currentUser.uid)
                .set(values)
                .then(() => {
                  app
                    .firestore()
                    .collection("users")
                    .doc(currentUser.uid)
                    .get()
                    .then((doc) => {
                      if (!doc.exists) {
                        return;
                      }
                      setData(doc.data(), setSubmitting(false));
                    });
                });
            }}
          >
            {(formik) => (
              <Form className={classes.form}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: "1 1 150px", margin: "5px" }}>
                    <MyTextField name="name" label="Name" />
                  </div>
                  <div style={{ flex: "1 1 200px", margin: "5px" }}>
                    <MyTextField name="surname" label="Surname" />
                  </div>
                </div>
                {/* <div style={{ margin: "5px" }}>
                  <MyTextField name="email" label="Email" />
                </div> */}
                <div style={{ margin: "5px" }}>
                  <MySelectField
                    name="position"
                    label="Position"
                    items={items}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                  }}
                >
                  <div style={{ marginTop: "15px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      name="save"
                      style={{ marginLeft: "5px" }}
                      disabled={
                        !formik.dirty || !formik.isValid || formik.isSubmitting
                      }
                    >
                      {formik.isSubmitting ? "SAVING..." : "SAVE"}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Box>
      <ChangeEmail />
      <ChangePassword />
      <DeleteAccount />
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="default"
          onClick={() => {
            props.setShowProfile(false);
          }}
        >
          CLOSE
        </Button>
      </div>
    </Container>
  );
};

export default Profile;
