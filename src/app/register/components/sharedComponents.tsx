import styles from "./shared.module.css";

export function PersonalInformation() {
  return (
    <div className={styles.container}>
    <div>
        <label>First Name</label>
        <input placeholder="E.g. Juan" type="name"></input>
    </div>
    <div>
        <label>Middle Name</label>
        <input placeholder="E.g. Marello" type="name"></input>
    </div>
    <div>
        <label>Last Name</label>
        <input placeholder="E.g. Dela Cruz" type="name"></input>
    </div>
    </div>
  );
}

export function CreatePassword() {
  return (
    <div className={styles.container}>
    <div>
        <label>Password</label>
        <input placeholder="Create a password" type="password"></input>
    </div>
    <div>
        <label>Confirm Password</label>
        <input placeholder="Retype password" type="password"></input>
    </div>
    </div>
  );
}



