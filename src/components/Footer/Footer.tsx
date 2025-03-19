import React from 'react';
import styles from './Footer.module.css';
import { ReactComponent as GitHubIcon } from '../../assets/github.svg'; // Импортируем SVG как компонент

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/VizitiuVitalie" target="_blank" rel="noopener noreferrer">
        <GitHubIcon className={styles.icon} />
        github: VizitiuVitalie
      </a>
    </footer>
  );
};

export default Footer;