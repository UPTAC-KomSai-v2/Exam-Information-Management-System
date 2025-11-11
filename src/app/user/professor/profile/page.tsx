import styles from "./page.module.css";
import Nav from "@/app/user/components/userNav";

export default function ProfessorProfile() {
  return (
    <div className={styles.page}>
      { Nav("professor") }
      <main className={styles.main}>
        <div className={styles.leftDiv}>
          <p className={styles.title}>User Details</p>
          <label>Name</label>
          <p>Juan Dela Cruz</p>
          <label>Country</label>
          <p>Philippines</p>
          <label>College</label>
          <p>BS Computer Science</p>
          <label>Faculty or Student</label>
          <p>Faculty</p>
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
