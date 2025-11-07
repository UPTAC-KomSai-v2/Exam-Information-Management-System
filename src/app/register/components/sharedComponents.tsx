import styles from "./shared.module.css";
import Image from "next/image";

export function Logo() {
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

export function PersonalInformation() {
  return (
    <div className={styles.container}>
        { InputContent("First Name", "E.g. Juan", "name") }
        { InputContent("Middle Name", "E.g. Marello", "name") }
        { InputContent("Last Name", "E.g. Dela Cruz", "name") }
    </div>
  );
}

export function CreatePassword() {
  return (
    <div className={styles.container}>
        { InputContent("Password", "Create a password", "password") }
        { InputContent("Confirm Password", "Retype password", "password") }
    </div>
  );
}

export function InputContent(str: string, placeholder: string, type: string) {
  return (<div>
      <label>{str}</label>
      <input placeholder={placeholder} type={type}></input>
  </div>
  );
}

export function LinkButton(str: string, href: string){ 
  return(
    <a
      className={styles.link}
      href={href}
      rel="noopener noreferrer"
    >
      {str}
    </a>
  );
}



