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
        <div className={styles.register}>
          <Image
            src={logo}
            alt="Logo"
            width={250}
            height={28}
          />
          <p className={styles.title}>Registering an Account</p>
          <hr />

          <p className={styles.innerTitle}>What are you registering as?</p>
          
          <a 
            className={styles.primary}
            href="/register/professor"
            rel="noopener noreferrer"
          >
            Professor
          </a>
          <a 
            className={styles.primary}
            href="/register/student"
            rel="noopener noreferrer"
          >
            Student
          </a>
         <a
            className={styles.link}
            href="/login"
            rel="noopener noreferrer"
          >
            Already have an account? Login here.
          </a>
          
        </div>
      </main>
    </div>
  );
}
