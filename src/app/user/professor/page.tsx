"use client";

import styles from "./page.module.css";
import Nav from "@/app/user/components/userNav";
import { useState } from "react";

export default function ProfessorDashboard() {
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
