import Image from "next/image";
import styles from "./page.module.css";
import Nav from "./components/homepageNav";
import Link from 'next/link';

let logo = "/images/logo.png";
let desc1 = "The premier Examination Information Management System for the University of the Philippines.";
let desc2 = "Maroon Book can serve as the main platform for managing all of your class examinations.";

export default function Home() {
  return (
    <div className={styles.page}>
      <Nav />

      <main className={styles.main}>
        <div className={styles.intro}>
          <Image
            src={logo}
            alt="Logo"
            width={500}
            height={65}
          />
          <h1>{desc1}</h1>
          <p>{desc2}</p>
        </div>

        <div className={styles.buttons}>
          <a
            className={styles.primary}
            href="/user/dashboard"
            rel="noopener noreferrer"
          >
            Register an Account
          </a>

          <a
            className={styles.primary}
            href="/user/dashboard"
            rel="noopener noreferrer"
          >
            Login to an Account
          </a>
        </div>
      </main>
    </div>
  );
}
