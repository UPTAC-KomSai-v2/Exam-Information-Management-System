import Image from "next/image";
import styles from "./nav.module.css";

let logo = "/images/logo.png";

export default function Home() {
  return (
    <header className={styles.nav}>
      <a 
          className={styles.logo}
          href=""
          rel="noopener noreferrer"
      >
        <Image
          src={logo}
          alt="Logo"
          width={217}
          height={26}
        />
      </a>
      <div className={styles.navButtons}>
        <a
          href=""
          rel="noopener noreferrer"
        >
          About Us
        </a>
        <a
          href=""
          rel="noopener noreferrer"
        >
          Register
        </a>
        <a
          href=""
          rel="noopener noreferrer"
        >
          Login
        </a>
      </div>
    </header>
  );
}
