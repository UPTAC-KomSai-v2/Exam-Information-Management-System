import Image from "next/image";
import styles from "@/app/register/components/shared.module.css";
import Nav from "@/app/components/homepageNav";
import Link from 'next/link';
import { PersonalInformation, CreatePassword } from "@/app/register/components/sharedComponents";

let logo = "/images/logo.png";
export default function Home() {
  return (
    <div className={styles.page}>
      <Nav />

      <main className={styles.main}>
        <div className={styles.overlay}>
          <Image
            src={logo}
            alt="Logo"
            width={250}
            height={28}
          />
          <p className={styles.title}>Registering as Student</p>
          <hr />

          <p className={styles.innerTitle}>Personal Information</p>
          <PersonalInformation />

          <p className={styles.innerTitle}>University Information</p>
          <div className={styles.container}>
            <div>
              <label>Campus</label>
              <input placeholder="E.g. Tacloban College" type="text"></input>
            </div>
            <div>
              <label>Program</label>
              <input placeholder="E.g. BS Computer Science" type="text"></input>
            </div>
          </div>
          <div className={styles.container}>
            <div>
              <label>Student Number</label>
              <input placeholder="Format: 20XX-XXXXX" type="text"></input>
            </div>
            <div>
              <label>UP Email Address</label>
              <input placeholder="Format: xxx@up.edu.ph" type="email"></input>
            </div>
          </div>
          
          <p className={styles.innerTitle}>Password Creation</p>
          <CreatePassword />

          <button className={styles.primary}>
            Create Account
          </button>
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
