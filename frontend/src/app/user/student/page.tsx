"use client";

import { type Course, courses, examScores, referenceExams, type Section } from "~/app/data/data";
import mainStyle from "./page.module.css";
import styles from "~/app/user/components/shared.module.css";
import Nav from "~/app/user/components/userNav";
import { type ReactNode, useContext } from "react";
import { type StudentUser, UserContext } from "~/app/UserContext";

export default function StudentDashboard() {
    const { baseUser } = useContext(UserContext);

    if (!baseUser) return <p>No user is logged in</p>;
    if (baseUser.type !== "student") return <p>User logged in is not a student</p>;

    return (
        <div className={styles.page}>
            <Nav scope="student" />
            <main className={`${styles.main} ${mainStyle.main} main `}>
                <p className="title22px">Dashboard</p>
                <RenderExamList baseUser={baseUser} />
            </main>
        </div>
    );
}

function RenderExamList({ baseUser }:{ baseUser: StudentUser }) {
    const indivExamContent = (examID: string, examTitle: string, examDescription: string, noOfItems: number, examType: string, timeAllotted: string, dueDate: string, tookExam: string) => {
        const pastDueDate = new Date() <= new Date(dueDate);

        return (
            <div className={styles.examCourseDiv} key={examID}>
                <p className="title22px">{examTitle}</p>
                <p className={styles.description}>{examDescription}</p>
                <div className={styles.information}>
                    <p>Total Items: {noOfItems}</p>
                    <p>Exam Type: {examType}</p>
                    <p>Time Allotted: {timeAllotted}</p>
                    <p>Due Date: {dueDate}</p>
                    <p>Taken Exam: {tookExam}</p>
                    <a>Hide Exam</a>

                    {tookExam === "No" && pastDueDate && (
                        <a>Take Exam</a>
                    )}

                    {tookExam === "Yes" && (
                        <a>View Exam</a>
                    )}
                </div>
            </div>
        );
    }

    const examList: ReactNode[] = [];
    const coursesEnrolled = getEnrolledCourses(baseUser);

    coursesEnrolled.forEach((course) => {
        console.log("inside of coursesEnrolled");
        console.log(course.courseTitle);
        const refExams = referenceExams.filter(refExam => refExam.courseID === course.courseID);
        
        const section = getEnrolledSection(course, baseUser);

        if(section === undefined)
            return;

        refExams.forEach((refExam) => {
            const courseDescription = `${course.courseTitle} - ${section.sectionName} | ${course.courseDescription}`;
            const tookExam = tookTheExam(refExam.examID, baseUser.id) ? "Yes" : "No";
            examList.push(indivExamContent(refExam.examID, refExam.examTitle, courseDescription, refExam.items, refExam.examType, refExam.timeAllotted, refExam.dueDate, tookExam));
        });
    }); 

    return examList;
}

export function getEnrolledCourses(baseUser: StudentUser){
    return courses.filter(course => {
        console.log(`isEnrolledInCourse(${course.courseTitle}, ${baseUser.firstName}) = ${isEnrolledInCourse(course, baseUser)}`);
        return isEnrolledInCourse(course, baseUser);
    });
}

export function isEnrolledInCourse(course: Course, baseUser: StudentUser) {
    if(!baseUser) return undefined;
    return course.sections.some(section => isEnrolledInSection(section, baseUser));
}

export function getEnrolledSection(course: Course, baseUser: StudentUser | null) {
    if(!baseUser) return undefined;
    const enrolledSection = course.sections.find(section => isEnrolledInSection(section, baseUser));
    console.log("ENROLLED SECTION = " + enrolledSection?.sectionName);
    return enrolledSection;
}

export function isEnrolledInSection(section: Section, baseUser: StudentUser) {
    const found = section.studentsEnrolled.some(studentID => {
        console.log(`${studentID} === ${baseUser.id} = ${studentID === baseUser.id}`);
        return studentID === baseUser.id;
    }); 
    console.log(`Found?? = ${found}`);
    return found;
}

export function tookTheExam(refExamID: string, studentID: string){
    return examScores.some(examScore => {
        return examScore.referencedExamID === refExamID && examScore.studentID === studentID;
    });
}
