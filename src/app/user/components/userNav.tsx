import Image from "next/image";
import styles from "./userNav.module.css";

let logo = "/images/logo.png";
let notification ="/images/notification_false.png";
let message = "/images/message_false.png";

export default function Home() {
  return (
    <header className={styles.nav}>
      <a 
          className={styles.logo}
          href="/"
          rel="noopener noreferrer"
      >
        <Image
          src={logo}
          alt="Logo"
          width={217}
          height={26}
        />
      </a>
      <div className={styles.navButtons}>
        <a
          href="/user/dashboard"
          rel="noopener noreferrer"
        >
          Dashboard
        </a>
        <a
          href="/user/courses"
          rel="noopener noreferrer"
        >
          Courses
        </a>
        <a
          href="/user/notification"
          rel="noopener noreferrer"
        >
          <Image
            src={notification}
            alt="notification"
            width={20}
            height={20}
          />
        </a>
        <a
          href="/user/message"
          rel="noopener noreferrer"
        >
          <Image
            src={message}
            alt="message"
            width={20}
            height={20}
          />
        </a>
        <a
          href="/user/profile"
          rel="noopener noreferrer"
        >
          Profile
        </a>
      </div>
    </header>
  );
}
