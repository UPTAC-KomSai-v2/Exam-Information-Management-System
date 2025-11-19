"use client";

import styles from "./page.module.css";
import sharedStyles from "@/app/user/components/shared.module.css";
import Nav from "@/app/user/components/userNav";
import Logo from "@/app/components/logo";
import { ReactElement, useContext, useState } from "react";

import { courses, referenceExams } from "@/app/data/data";
import { UserContext } from "@/app/UserContext";

export default function ProfessorCourses() {
  const [ showOverlay, setShowOverlay]  = useState(false);
  const { currentUser } = useContext(UserContext);
  if(!currentUser) return <p>No user is logged in</p>;
  if(!("college" in currentUser)) return <p>User logged in is not faculty</p>;

  // rendering a number of courses lol
  let coursesArray: Array<ReactElement>;
  coursesArray = [];

  const coursesTaught = courses.filter(course => {console.log(course.coursefacultyID + " vs " + currentUser.userID); return course.coursefacultyID === currentUser.userID});
  coursesTaught.forEach((course) => {
    const fullCourseDescription = course.courseDescription + " | " + course.academicYear + " " + course.semester;
    const noOfExams = referenceExams.filter(refExam => refExam.courseID === course.courseID).length;
    coursesArray.push(addCourseToPage(
      course.courseID,
      course.courseTitle,
      fullCourseDescription,
      noOfExams
    ))
  });
  

  return (
    <div className={`${sharedStyles.page} ${styles.page}`}>
      { Nav("professor") }
      <main className={sharedStyles.main}>
        <p className={sharedStyles.title}>Courses</p>
        { coursesArray }
        <button
          className={styles.enrollCourse}
          onClick={() => setShowOverlay(true)}
        >
          +
        </button>

        { showOverlay && (
          <div className={styles.filter}>
          </div>
        )}
        {
          showOverlay && (
          <div className={styles.overlay}>
            { Logo(217, 26) }
            <p className={styles.overlayTitle}>Enroll a course</p>
            
            <div>
              <p>To enroll on a course, please</p>
              <p> enter the course code below.</p>
            </div>
            
            <div className={styles.inputContainer}>
              <label>Course Code:</label>
              <input type="text" name="courseCode" className={styles.courseCode}/>
            </div>
            <button 
              className={styles.submit}
              onClick={() => setShowOverlay(false)}
            >Submit</button>
            <button 
              className={styles.exitOverlay} 
              onClick={() => setShowOverlay(false)}
            >✖</button>
          </div>
        )}
      </main>
    </div>
  );
}

function addCourseToPage(courseID: string, courseTitle: string, courseDescription: string, noOfExams: number) {
  const href = "./courses/viewCourseReport?courseID=" + courseID;
  return (
    <div className={styles.courseDiv} key={courseID}>
      <p className={sharedStyles.title}>{courseTitle}</p>
      <p className={styles.description}>{courseDescription}</p>
      <div className={sharedStyles.information}>
        <p>Total Exams: {noOfExams}</p>
        <a 
          href={href}
          rel="noopener noreferrer"
        >View Course Report</a>
      </div>
    </div>
  );
}