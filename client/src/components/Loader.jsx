import React from "react";
import { HashLoader } from "react-spinners";

const Loader = ({ size = 50 }) => {
  return (
    <div style={styles.container}>
      <HashLoader size={size} color="#000000" />
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Loader;
