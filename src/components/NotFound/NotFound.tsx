import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./NotFound.module.css"
const NotFound = () => {
  return (
    <div className={styles.not_found_container}>
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className={styles.home_link}>
        ⬅ Back to Home
      </Link>
    </div>
  );
};

export default NotFound;