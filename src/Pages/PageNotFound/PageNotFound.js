import React from "react";
import styles from "./PageNotFound.module.css";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.Container}>
      <h1>404</h1>
      <h3>Page Not Found</h3>
      <button className={styles.btn} onClick={() => navigate("/")}>
        Got to DashBoard
      </button>
    </div>
  );
}

export default PageNotFound;
