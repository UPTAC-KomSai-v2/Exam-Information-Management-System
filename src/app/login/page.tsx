import Image from "next/image";
import styles from "./page.module.css";
import Nav from "@/app/components/homepageNav";

let desc1 = "The premier Examination Information Management System for the University of the Philippines.";
let desc2 = "Maroon Book can serve as the main platform for managing all of your class examinations.";

export default function Home() {
  return (
    <div className={styles.page}>
      <Nav />

      <main className={styles.main}>
        <div className={styles.login}>
          { logo() }
          <p className={styles.title}>Logging in to an Account</p>
          <hr />
          
          <div className={styles.container}>
            { inputContent("Student Number", "Enter your student no.", "name") }
            { inputContent("Password", "Enter your password", "password") }
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

function inputContent(str: string, placeholder: string, type: string){
    return (<div>
        <label>{str}</label>
        <input placeholder={placeholder} type={type}></input>
    </div>
    );
}

function logo() {
  let logo = "/images/logo.png";
  return (
    <Image
      src={logo}
      alt="Logo"
      width={250}
      height={28}
    />
  );
}
