"use client";

import styles from "./page.module.css";
import Nav from "@/app/user/components/userNav";
import Logo from "@/app/components/logo";
import { ReactElement, useContext, useState } from "react";

import { courses, referenceExams, Section } from "@/app/data/data";
import { Student, UserContext } from "@/app/UserContext";

export default function StudentCourses() {
  const [ showOverlay, setShowOverlay]  = useState(false);
  const { currentUser } = useContext(UserContext);
  if(!currentUser) return <p>No user is logged in</p>;
  if("college" in currentUser) return <p>User logged in is not a student</p>;

  // rendering a number of courses lol
  let coursesArray: Array<ReactElement>;
  coursesArray = [];

  const coursesEnrolled = courses.filter(course => { 
    const enrolledSection = findEnrolledSection(course.sections, currentUser);
    return (enrolledSection != null);
  });
  coursesEnrolled.forEach((course) => {
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
    <div className={styles.page}>
      { Nav("student") }
      <main className={styles.main}>
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
      <p className={styles.title}>{courseTitle}</p>
      <p className={styles.description}>{courseDescription}</p>
      <div className={styles.information}>
        <p>Total Exams: {noOfExams}</p>
        <a 
          href={href}
          rel="noopener noreferrer"
        >View Course Report</a>
      </div>
    </div>
  );
}

function findEnrolledSection(sections: Section[], currentUser: Student) {
    return sections.find(section => {
      return section.studentsEnrolled.some(studentID => studentID === currentUser.userID);
    });
}