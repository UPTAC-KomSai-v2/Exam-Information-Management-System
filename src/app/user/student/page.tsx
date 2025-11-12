"use client";

import { courses, examScores, ReferenceExam, referenceExams, Section } from "@/app/data/data";
import styles from "./page.module.css";
import Nav from "@/app/user/components/userNav";
import { ReactNode, useContext } from "react";
import { Student, UserContext } from "@/app/UserContext";

export default function StudentDashboard() {
  const { currentUser } = useContext(UserContext);
  console.log(!currentUser);
  if(!currentUser) return <p>No user is logged in</p>;
  if(("college" in currentUser)) return <p>User logged in is not student</p>;

  return (
    <div className={styles.page}>
      { Nav("student") }
      <main className={styles.main}>
        { renderExamList(currentUser) }
      </main>
    </div>
  );
}

function renderExamList(currentUser: Student) {
  const indivExamContent = (examID: string, examTitle: string, examDescription: string, score: string, examType: string, timeAllotted: string, dueDate: string, examTaken: string) => {
    return(
      <div className={styles.examDiv} key={examID}>
        <p className={styles.title}>{examTitle}</p>
        <p className={styles.description}>{examDescription}</p>
        <div className={styles.information}>
          <p>Score: {score}</p>
          <p>Exam Type: {examType}</p>
          <p>Time Allotted: {timeAllotted}</p>
          <p>Due Date: {dueDate}</p>
          <p>Exam Taken: {examTaken}</p>
          <p>View Exam</p>
        </div>
      </div>
    );
  }

  let examList:Array<ReactNode> = [];
  const coursesEnrolled = courses.filter(course => (findEnrolledSection(course.sections, currentUser) != null));

  coursesEnrolled.forEach((course) => {
    console.log("inside of courseEnrolled");
    console.log(course.courseTitle);
    const refExams = referenceExams.filter(refExam => refExam.courseID === course.courseID);
    
    refExams.forEach((refExam) => {
      const enrolledSection = findEnrolledSection(course.sections, currentUser);
      const enrolledSectionName = enrolledSection ? enrolledSection.sectionName : "N/A";

      const courseDescription = `${course.courseTitle} - ${enrolledSectionName} | ${course.courseDescription}`;
      const { hasTakenExam, score } = examResults(currentUser);
      const examTaken = hasTakenExam ? "Yes" : "Not yet";
      examList.push(indivExamContent(refExam.examID, refExam.examTitle, courseDescription, `${score}/${refExam.items}`, refExam.examType, refExam.timeAllotted, refExam.dueDate, examTaken));
    });
  }); 

  return examList;
}

function findEnrolledSection(sections: Section[], currentUser: Student) {
    return sections.find(section => {
      return section.studentsEnrolled.some(studentID => studentID === currentUser.userID);
    });
}

function examResults(currentUser: Student) {
  const hasTakenExam = examScores.some(examScore => examScore.studentID === currentUser.userID);
  const examResult = examScores.find(examScore => examScore.studentID === currentUser.userID);
  const score = examResult ? examResult.score : "N/A";
  return { hasTakenExam, score };
}


