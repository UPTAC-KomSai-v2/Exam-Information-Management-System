import styles from "../components/shared.module.css";
import Nav from "@/app/components/homepageNav";
import { PersonalInformation, CreatePassword, InputContent, LinkButton } from "../components/sharedComponents";
import Logo from "@/app/components/logo";

export default function Home() {
  return (
    <div className={styles.page}>
      <Nav />

      <main className={styles.main}>
        <div className={styles.overlay}>
          { Logo(250, 28) }
          
          <p className={styles.title}>Registering as Student</p>
          <hr />

          <p className={styles.innerTitle}>Personal Information</p>
          <PersonalInformation />

          <p className={styles.innerTitle}>University Information</p>
          <div className={styles.container}>
            { InputContent("Campus", "E.g. Tacloban College", "text") }
            { InputContent("Program", "E.g. BS Computer Science", "text") }
          </div>
          <div className={styles.container}>
            { InputContent("Student Number", "Fotmat: 20XX-XXXXX", "text") }
            { InputContent("UP Email Address", "Format: xxx@up.edu.ph", "email") }
          </div>
          
          <p className={styles.innerTitle}>Password Creation</p>
          <CreatePassword />

          <button className={styles.primary}>
            Create Account
          </button>
          { LinkButton("Already have an account? Login here.", "/login") }
        </div>
      </main>
    </div>
  );
}
