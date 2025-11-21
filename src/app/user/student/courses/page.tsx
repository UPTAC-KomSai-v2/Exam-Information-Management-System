"use client";

import sharedStyles from "@/app/user/components/shared.module.css";
import styles from "./page.module.css";
import Nav from "@/app/user/components/userNav";
import Logo from "@/app/components/logo";
import { ReactElement, useContext, useState } from "react";

import { courses, referenceExams, Section } from "@/app/data/data";
import { Student, UserContext } from "@/app/UserContext";
import { getEnrolledCourses, getEnrolledSection, isEnrolledInCourse } from "../page";

export default function StudentCourses() {
  const [ showOverlay, setShowOverlay]  = useState(false);
  const { currentUser } = useContext(UserContext);
  if(!currentUser) return <p>No user is logged in</p>;
  if(("college" in currentUser)) return <p>User logged in is not a student</p>;

  // rendering a number of courses lol
  let coursesArray: Array<ReactElement>;
  coursesArray = [];

  const coursesEnrolled = getEnrolledCourses(currentUser);
  coursesEnrolled.forEach((course) => {
    const enrolledSection = getEnrolledSection(course, currentUser);
    const fullCourseTitle = `${course.courseTitle} - ${enrolledSection?.sectionName}`;
    const fullCourseDescription = `${course.courseDescription} | ${course.academicYear} ${course.semester}`;
    const noOfExams = getNoOfExamsPerSection(enrolledSection, currentUser);
    coursesArray.push(addCourseToPage(
      course.courseID,
      fullCourseTitle,
      fullCourseDescription,
      noOfExams
    ))
  });
  

  return (
    <div className={`${sharedStyles.page} ${styles.page}`}>
      <Nav dir="student" />
      <main className={`${sharedStyles.main} ${styles.main} main`}>
        <p className="title22px">Courses</p>
        { coursesArray }

        <button
          className={styles.enrollCourse}
          onClick={() => setShowOverlay(true)}
        >+</button>

        { showOverlay && (
          <div className={styles.filter}>
          </div>
        )}
        {
          showOverlay && (
          <div className={styles.overlay}>
            <Logo width={217} height={26} />
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
              className="primaryButton"
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
    <div className={sharedStyles.examCourseDiv} key={courseID}>
      <p className="title22px">{courseTitle}</p>
      <p className={sharedStyles.description}>{courseDescription}</p>
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

export function getNoOfExamsPerSection(enrolledSection: Section|undefined, urrentUser: Student) {
  if(enrolledSection === undefined) return 0;
  return referenceExams.filter(refExam => refExam.sections.some(section => section === enrolledSection.sectionName)).length;
}