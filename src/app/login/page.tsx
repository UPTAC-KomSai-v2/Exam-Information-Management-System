import Image from "next/image";
import styles from "./page.module.css";
import Nav from "@/app/components/homepageNav";
import Link from 'next/link';

let logo = "/images/logo.png";
let desc1 = "The premier Examination Information Management System for the University of the Philippines.";
let desc2 = "Maroon Book can serve as the main platform for managing all of your class examinations.";

export default function Home() {
  return (
    <div className={styles.page}>
      <Nav />

      <main className={styles.main}>
        <div className={styles.login}>
          <Image
            src={logo}
            alt="Logo"
            width={250}
            height={28}
          />
          <p className={styles.title}>Logging in to an Account</p>
          <hr />
          
          <div className={styles.container}>
            <div>
              <label>Student Number</label>
              <input placeholder="Enter your student no." type="name"></input>
            </div>
            <div>
              <label>Password</label>
              <input placeholder="Enter your password" type="password"></input>
            </div>
          </div>

          <button className={styles.primary}>
            Log In 
          </button>
         <a
            className={styles.link}
            href="/register"
            rel="noopener noreferrer"
          >
            Don't have an account yet? Register here.
          </a>
          
        </div>
      </main>
    </div>
  );
}
