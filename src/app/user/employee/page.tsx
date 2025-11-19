"use client";

import { courses, referenceExams } from "@/app/data/data";
import styles from "./page.module.css";
import sharedStyles from "@/app/user/components/shared.module.css";
import Nav from "@/app/user/components/userNav";
import { ReactNode, useContext } from "react";
import { Faculty, UserContext } from "@/app/UserContext";

export default function ProfessorDashboard() {
  const { currentUser } = useContext(UserContext);
  if(!currentUser) return <p>No user is logged in</p>;
  if(!("college" in currentUser)) return <p>User logged in is not faculty</p>;

  return (
    <div className={`${sharedStyles.page} ${styles.page}`}>
      { Nav("professor") }
      <main className={sharedStyles.main}>
        <p className={sharedStyles.title}>Dashboard</p>
        { renderExamList(currentUser) }
      </main>
    </div>
  );
}

function renderExamList(currentUser: Faculty) {
  const indivExamContent = (examID: string, examTitle: string, examDescription: string, sectionNames: string, noOfItems: number, examType: string, timeAllotted: string, dueDate: string) => {
    return(
      <div className={styles.examDiv} key={examID}>
        <p className={sharedStyles.title}>{examTitle}</p>
        <p className={styles.description}>{examDescription}</p>
        <div className={sharedStyles.information}>
          <p>Sections: {sectionNames}</p>
          <p>Total Items: {noOfItems}</p>
          <p>Exam Type: {examType}</p>
          <p>Time Allotted: {timeAllotted}</p>
          <p>Due Date: {dueDate}</p>
          <a>Publish Exam</a>
          <a>Hide Exam</a>
          <a>View Exam</a>
        </div>
      </div>
    );
  }

  let examList:Array<ReactNode> = [];
  const coursesTaught = courses.filter(course => {console.log(course.coursefacultyID + " vs " + currentUser.userID); return course.coursefacultyID === currentUser.userID});
  coursesTaught.forEach((course) => {
    console.log("inside of coursesTaught");
    console.log(course.courseTitle);
    const refExams = referenceExams.filter(refExam => refExam.courseID === course.courseID);
    
    let sectionNames = "";
    course.sections.forEach(section => sectionNames += `${section.sectionName} , `);
    sectionNames.slice(0, sectionNames.length-2);

    refExams.forEach((refExam) => {
      const courseDescription = `${course.courseTitle} | ${course.courseDescription}`
      examList.push(indivExamContent(refExam.examID, refExam.examTitle, courseDescription, sectionNames, refExam.items, refExam.examType, refExam.timeAllotted, refExam.dueDate));
    });
  }); 

  return examList;
}
