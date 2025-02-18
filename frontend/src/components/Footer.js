import styles from '../styles/Footer.module.css';

/**
 * Footer component renders the footer section of the page.
 * @returns {JSX.Element} The Footer component.
 */
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <h3 className={styles.footerTitle}>COMMUNITY GARDENS</h3>
        <p>CPSC 304 921 2024S2</p>
        <p>FRED SUNSTRUM • JEFFREY HO • MICHELLE LEI</p>
      </div>
    </footer>
  );
};

export default Footer;
