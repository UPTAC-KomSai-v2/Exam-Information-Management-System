import Image from "next/image";
import styles from "./homepageNav.module.css";
import Logo from "./logo";
import { ReactNode } from "react";

type navBarType = {
    navButtons: ReactNode;
}

export default function NavigationBar({ navButtons } : navBarType) {
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
        { navButtons }
      </div>
    </header>
  );
}
