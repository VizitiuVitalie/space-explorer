import React from "react";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>Welcome to Space Explorer</h1>
            <p>Explore the space with us!</p>
        </div>
    )
}

export default HomePage;

export {};