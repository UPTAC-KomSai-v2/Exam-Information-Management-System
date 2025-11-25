"use client";

import { courses, referenceExams } from "~/app/data/data";
import mainStyle from "./page.module.css";
import styles from "@/app/user/components/shared.module.css";
import Nav from "~/app/user/components/userNav";
import { type ReactNode, useContext } from "react";
import { type Employee, UserContext } from "~/app/UserContext";

export default function EmployeeDashboard() {
  const { currentUser } = useContext(UserContext);
  if(!currentUser) return <p>No user is logged in</p>;
  if(!("college" in currentUser)) return <p>User logged in is not faculty</p>;

  return (
    <div className={styles.page}>
      <Nav scope="employee" />

      <main className={`${styles.main} ${mainStyle.main} main `}>
        <p className="title22px">Dashboard</p>
        <RenderExamList currentUser={currentUser} />
      </main>
    </div>
  );
}

function RenderExamList({currentUser}:{currentUser: Employee}) {
  const indivExamContent = (examID: string, examTitle: string, examDescription: string, sectionNames: string, noOfItems: number, examType: string, timeAllotted: string, dueDate: string) => {
  return(
      <div className={styles.examCourseDiv} key={examID}>
        <p className="title22px">{examTitle}</p>
        <p className={styles.description}>{examDescription}</p>
        <div className={styles.information}>
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

  const examList: Array<ReactNode> = [];
  const coursesTaught = courses.filter(course => course.courseEmployeeID === currentUser.userID);

  coursesTaught.forEach((course) => {
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
