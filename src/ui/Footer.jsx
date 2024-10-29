import React from "react";
import { Link } from "react-router-dom";
import styles from "../style/Footer.module.css"; // Assuming you have a CSS module for styling

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.links}>
          <Link to="/about">О нас</Link>
          <Link to="/contact">Контакты</Link>
          <Link to="/terms">Условия использования</Link>
          <Link to="/privacy">Политика конфиденциальности</Link>
        </div>

        <div className={styles.socials}>
          <a
            href="https://www.instagram.com/anonimanas.1kurs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./insta.png" alt="Instagram" />
          </a>
        </div>
        &copy;  ama benimki değil
      </div>
      <div className={styles.copyright}>
        &copy; {new Date().getFullYear()} Anony. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;
