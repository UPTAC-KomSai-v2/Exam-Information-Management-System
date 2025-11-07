import Image from "next/image";
import styles from "./page.module.css";
import Nav from "./components/homepageNav";

let desc1 = "The premier Examination Information Management System for the University of the Philippines.";
let desc2 = "Maroon Book can serve as the main platform for managing all of your class examinations.";

export default function Home() {
  return (
    <div className={styles.page}>
      <Nav />

      <main className={styles.main}>
        <div className={styles.intro}>
          { logo() }
          <h1>{desc1}</h1>
          <p>{desc2}</p>
        </div>

        <div className={styles.buttons}>
          { linkButton("Register an Account", "/register")}
          { linkButton("Login to an Account", "/login")}
        </div>
      </main>
    </div>
  );
}

function linkButton(str: string, href: string) {
  return(
    <a
      className={styles.primary}
      href={href}
      rel="noopener noreferrer"
    >
      {str}
    </a>
  )
}

function logo() {
  let logo = "/images/logo.png";
  return(
    <Image
      src={logo}
      alt="Logo"
      width={500}
      height={65}
    />
  );
}
