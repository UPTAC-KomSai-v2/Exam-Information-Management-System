import styles from "./page.module.css";
import Nav from "@/app/user/components/userNav";

export default function ProfessorProfile() {
  return (
    <div className={styles.page}>
      <Nav />
      <main className={styles.main}>
        <div className={styles.leftDiv}>
          <p className={styles.title}>User Details</p>
          <label>Name</label>
          <p>Nikka Angela E. Naputo</p>
          <label>Country</label>
          <p>Philippines</p>
          <label>Degree Program</label>
          <p>BS Computer Science</p>
          <label>Faculty or Student</label>
          <p>Student</p>
        </div>
        <div className={styles.rightDiv}>
          <p className={styles.title}>User Actions</p>
          <a href="/">Log Out</a>
          <a>Edit Profile</a>
        </div>
      </main>
    </div>
  );
}
