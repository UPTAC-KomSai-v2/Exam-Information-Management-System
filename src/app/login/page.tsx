import styles from "./page.module.css";
import Nav from "@/app/components/homepageNav";
import Logo from "@/app/components/logo";

export default function Register() {
  return (
    <div className={styles.page}>
      <Nav />

      <main className={styles.main}>
        <div className={styles.register}>
          { Logo(250, 28) }
          <p className={styles.title}>Logging Into an Account</p>
          <hr />

          <p className={styles.innerTitle}>What are you logging in as?</p>
          { button("Professor", "/login/professor") }
          { button("Student", "/login/student") }
          
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

function button(str: string, directory: string) {
  return (
    <a 
      className={styles.primary}
      href={directory}
      rel="noopener noreferrer"
    >
      {str}
    </a>
  );
}
