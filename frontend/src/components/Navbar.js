import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1>Community Gardens</h1>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/gardens">Gardens</Link>
        </li>
        <li>
          <Link href="/donations">Donations</Link>
        </li>
        {/* <li>
          <Link href="/gardeners">Gardeners</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
