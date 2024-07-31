import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
      <Link href="/" legacyBehavior>
          <a className={styles.logoLink}><h1>COMMUNITY GARDENS</h1></a>
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/gardens">Gardens</Link>
        </li>
        <li>
          <Link href="/gardeners">Gardeners</Link>
        </li>
        <li>
          <Link href="/donations">Donations</Link>
        </li>
        <li>
          <Link href="/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
