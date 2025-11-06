"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Nav from "@/app/components/userNav";
import { useState } from "react";

let logo = "/images/logo.png";
let desc1 = "The premier Examination Information Management System for the University of the Philippines.";
let desc2 = "Maroon Book can serve as the main platform for managing all of your class examinations.";

function openOverlay() {
  console.log("hello world");
}


export default function Home() {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <div className={styles.page}>
      <Nav />
      <main className={styles.main}>
        <div className={styles.examDiv}>
          <p className={styles.title}>Second Long Exam (Lecture)</p>
          <p className={styles.description}>CMSC 135 - F | Data Communication and Networking | AY 2026 - 2026 First Semester</p>
          <div className={styles.information}>
            <p>Total Items: 50</p>
            <p>Grade: N/A</p>
            <p>Exam Type: Submission</p>
            <p>Time Allotted: 30 minutes</p>
            <p>Due Date: November 27, 2025</p>
            <p>Taken: Not yet</p>
            <a>Take Exam</a>
          </div>
        </div>
      </main>
    </div>
  );
}
