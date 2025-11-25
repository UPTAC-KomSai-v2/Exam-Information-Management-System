"use client";

import { courses, referenceExams, type ReferenceExam } from "~/app/data/data";
import mainStyle from "./page.module.css";
import styles from "~/styles/shared.module.css";
import Nav from "~/app/user/components/userNav";
import { type ReactNode, useContext } from "react";
import { type Employee, UserContext } from "~/app/UserContext";

export default function EmployeeDashboard() {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) return <p>No user is logged in</p>;
    if (currentUser.type !== "employee") return <p>User logged in is not faculty</p>;

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

function RenderExamList({ currentUser }: { currentUser: Employee }) {
    const indivExamContent = (refExam: ReferenceExam, examDescription: string, sectionNames: string) => {
        return(
            <div className={styles.examCourseDiv} key={refExam.examID}>
                <p className="title22px">{refExam.examTitle}</p>
                <p className={styles.description}>{examDescription}</p>
                <div className={styles.information}>
                    <p>Sections: {sectionNames}</p>
                    <p>Total Items: {refExam.items}</p>
                    <p>Exam Type: {refExam.examType}</p>
                    <p>Time Allotted: {refExam.timeAllotted}</p>
                    <p>Due Date: {refExam.dueDate}</p>
                    <a>Publish Exam</a>
                    <a>Hide Exam</a>
                    <a>View Exam</a>
                </div>
            </div>
        );
    }

    const examList: ReactNode[] = [];
    const coursesTaught = courses.filter(course => course.courseEmployeeID === currentUser.userID);

    coursesTaught.forEach((course) => {
        const refExams = referenceExams.filter(refExam => refExam.courseID === course.courseID);
        
        let sectionNames = "";
        course.sections.forEach(section => sectionNames += `${section.sectionName} , `);
        sectionNames.slice(0, sectionNames.length-2);

        refExams.forEach((refExam) => {
            const courseDescription = `${course.courseTitle} | ${course.courseDescription}`
            examList.push(indivExamContent(refExam, courseDescription, sectionNames));
        });
    });

    return examList;
}
