"use client";
import { UserContext } from "@/app/UserContext";
import styles from "./page.module.css";
import sharedStyles from "@/app/user/components/shared.module.css";
import Nav from "@/app/user/components/userNav";
import { useContext } from "react";

export default function EmployeeProfile() {
  const { currentUser } = useContext(UserContext);
  if(!currentUser) return <p>There's no user logged in.</p>;
  if(!("college" in currentUser)) return <p>User logged in is not faculty</p>;

  const fullName = currentUser.firstName + " " + currentUser.middleName.charAt(0) + ". " + currentUser.lastName;

  return (
    <div className="page">
      <Nav dir="employee" />
      <main className={`${sharedStyles.main} ${styles} main`}>
        <div className={styles.leftDiv}>
          <p className="title22px">User Details</p>
          <label>Name</label>
          <p>{fullName}</p>
          <label>Country</label>
          <p>Philippines</p>
          <label>College</label>
          <p>{currentUser.college}</p>
          <label>Employee or Student</label>
          <p>Employee</p>
        </div>
        <div className={styles.rightDiv}>
          <p className="title22px">User Actions</p>
          <a href="/">Log Out</a>
          <a>Edit Profile</a>
        </div>
      </main>
    </div>
  );
}
