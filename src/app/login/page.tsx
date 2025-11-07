import Image from "next/image";
import styles from "./page.module.css";
import Nav from "@/app/components/homepageNav";
import Logo from "@/app/components/logo";

export default function Home() {
  return (
    <div className={styles.page}>
      <Nav />

      <main className={styles.main}>
        <div className={styles.login}>
          { Logo(250, 28) }
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
  return (
    <div>
      <label>{str}</label>
      <input placeholder={placeholder} type={type}></input>
    </div>
  );
}
