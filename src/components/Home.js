import React from "react";
import app from "../Base";

const Home = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <button
        onClick={() => {
          app.auth().signOut();
        }}
      >
        Sign Out
      </button>
    </>
  );
};

export default Home;
