"use client";

import styles from "./page.module.css";
import Nav from "@/app/user/components/userNav";
import { useState } from "react";

let logo = "/images/logo.png";
let desc1 = "The premier Examination Information Management System for the University of the Philippines.";
let desc2 = "Maroon Book can serve as the main platform for managing all of your class examinations.";

function openOverlay() {
  console.log("hello world");
}


export default function StudentProfile() {
  const [showOverlay, setShowOverlay] = useState(false);
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
