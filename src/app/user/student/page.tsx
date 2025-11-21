"use client";

import { Course, courses, referenceExams, Section } from "@/app/data/data";
import mainStyle from "./page.module.css";
import styles from "@/app/user/components/shared.module.css";
import Nav from "@/app/user/components/userNav";
import { ReactNode, useContext } from "react";
import { Student, UserContext } from "@/app/UserContext";

export default function StudentDashboard() {
  const { currentUser } = useContext(UserContext);
  if(!currentUser) return <p>No user is logged in</p>;
  if(("college" in currentUser)) return <p>User logged in is not a student</p>;

  return (
    <div className={styles.page}>
      <Nav dir="student" />
      <main className={`${styles.main} ${mainStyle.main} main `}>
        <p className="title22px">Dashboard</p>
        <RenderExamList currentUser={currentUser} />
      </main>
    </div>
  );
}

function RenderExamList({currentUser}:{currentUser: Student}) {
  const indivExamContent = (examID: string, examTitle: string, examDescription: string, noOfItems: number, examType: string, timeAllotted: string, dueDate: string) => {
    return(
      <div className={styles.examCourseDiv} key={examID}>
        <p className="title22px">{examTitle}</p>
        <p className={styles.description}>{examDescription}</p>
        <div className={styles.information}>
          <p>Total Items: {noOfItems}</p>
          <p>Exam Type: {examType}</p>
          <p>Time Allotted: {timeAllotted}</p>
          <p>Due Date: {dueDate}</p>
          <p>Taken Exam: Yes</p>
          <a>Hide Exam</a>
          <a>View Exam</a>
        </div>
      </div>
    );
  }

  let examList:Array<ReactNode> = [];
  const coursesEnrolled = getEnrolledCourses(currentUser);

  coursesEnrolled.forEach((course) => {
    console.log("inside of coursesEnrolled");
    console.log(course.courseTitle);
    const refExams = referenceExams.filter(refExam => refExam.courseID === course.courseID);
    
    let section = getEnrolledSection(course, currentUser);
    if(section === undefined)
      return;

    refExams.forEach((refExam) => {
      const courseDescription = `${course.courseTitle} - ${section.sectionName} | ${course.courseDescription}`
      examList.push(indivExamContent(refExam.examID, refExam.examTitle, courseDescription, refExam.items, refExam.examType, refExam.timeAllotted, refExam.dueDate));
    });
  }); 

  return examList;
}

export function getEnrolledCourses(currentUser: Student){
  return courses.filter(course => {
    console.log(`isEnrolledInCourse(${course.courseTitle}, ${currentUser.firstName}) = ${isEnrolledInCourse(course, currentUser)}`);
    return isEnrolledInCourse(course, currentUser);
  });
}

export function isEnrolledInCourse(course: Course, currentUser: Student) {
  if(!currentUser) return undefined;
  return course.sections.some(section => isEnrolledInSection(section, currentUser));
}

export function getEnrolledSection(course: Course, currentUser: Student|null) {
  if(!currentUser) return undefined;
  const enrolledSection = course.sections.find(section => isEnrolledInSection(section, currentUser));
  console.log("ENROLLED SECTION = " + enrolledSection?.sectionName);
  return enrolledSection;
}

export function isEnrolledInSection(section: Section, currentUser: Student) {
  const found = section.studentsEnrolled.some(studentID => {
    console.log(`${studentID} === ${currentUser.userID} = ${studentID === currentUser.userID}`);
    return studentID === currentUser.userID;
  }); 
  console.log(`Found?? = ${found}`);
  return found;
}