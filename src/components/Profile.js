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
import { MyTextField } from "./Formik/TextField";
import { MySelectField } from "./Formik/SelectField";

import { items } from "../PositionValues";

import { AuthContext } from "./../Auth";
import app from "./../Base";

//------
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    position: "relative",
    backgroundColor: theme.palette.background.paper,
  },

  backdrop: {
    position: "absolute",
    zIndex: 999,
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
    <Container className={classes.root}>
      <div style={{ flexBasis: "700px" }}>
        <Box boxShadow={3} m={1} p={3} className={classes.box}>
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
                <Form style={{ marginTop: "15px" }}>
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
                  <div style={{ margin: "5px" }}>
                    <MyTextField name="email" label="Email" />
                  </div>
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
                        variant="text"
                        color="default"
                        name="close"
                        onClick={() => props.setShowProfile(false)}
                      >
                        CLOSE
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        name="save"
                        style={{ marginLeft: "5px" }}
                        disabled={
                          !formik.dirty ||
                          !formik.isValid ||
                          formik.isSubmitting
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
      </div>
    </Container>
  );
};

export default Profile;
