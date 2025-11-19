import Image from "next/image";
import styles from "./page.module.css";
import sharedStyles from "./components/shared.module.css";
import Nav from "./components/homepageNav";

let desc1 = "The premier Examination Information Management System for the University of the Philippines.";
let desc2 = "Maroon Book can serve as the main platform for managing all of your class examinations.";

export default function Home() {
  return (
    <div className={`page ${sharedStyles.imageBackground}`}>
      <Nav />

      <main className={`main ${styles.main}`}>
        <div className={styles.intro}>
          <Logo />
          <h1>{desc1}</h1>
          <p>{desc2}</p>
        </div>

        <div className={styles.buttons}>
          <LinkButton str="Register an Account" href="/register" />
          <LinkButton str="Login to an Account" href="/login" />
        </div>
      </main>
    </div>
  );
}

function LinkButton({str, href}:{str: string, href: string}) {
  return(
    <a
      className="primaryButton"
      href={href}
      rel="noopener noreferrer"
    >
      {str}
    </a>
  )
}

function Logo() {
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
