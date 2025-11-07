import Image from "next/image";
import styles from "./homepageNav.module.css";
import Logo from "./logo";

let logo = "/images/logo.png";

export default function Home() {
  return (
    <header className={styles.nav}>
      <a 
          className={styles.logo}
          href="/"
          rel="noopener noreferrer"
      >
        { Logo(217, 26) }
      </a>
      <div className={styles.navButtons}>
        <a
          href=""
          rel="noopener noreferrer"
        >
          About Us
        </a>
        <a
          href="/register"
          rel="noopener noreferrer"
        >
          Register
        </a>
        <a
          href="/login"
          rel="noopener noreferrer"
        >
          Login
        </a>
      </div>
    </header>
  );
}

