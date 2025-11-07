import styles from "./page.module.css";
import Nav from "@/app/components/homepageNav";
import Logo from "@/app/components/logo";

export default function Home() {
  return (
    <div className={styles.page}>
      <Nav />

      <main className={styles.main}>
        <div className={styles.register}>
          { Logo(250, 28) }
          <p className={styles.title}>Registering an Account</p>
          <hr />

          <p className={styles.innerTitle}>What are you registering as?</p>
          { button("Professor", "/register/professor") }
          { button("Student", "/register/student") }
          
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
