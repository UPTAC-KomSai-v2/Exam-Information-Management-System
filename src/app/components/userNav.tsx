import Image from "next/image";
import styles from "./userNav.module.css";

let logo = "/images/logo.png";

export default function Home() {
  return (
    <header className={styles.nav}>
      <a 
          className={styles.logo}
          href="/"
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
          href="/dashboard"
          rel="noopener noreferrer"
        >
          Dashboard
        </a>
        <a
          href="/courses"
          rel="noopener noreferrer"
        >
          Courses
        </a>
        <a
          href="/profile"
          rel="noopener noreferrer"
        >
          Profile
        </a>
      </div>
    </header>
  );
}
