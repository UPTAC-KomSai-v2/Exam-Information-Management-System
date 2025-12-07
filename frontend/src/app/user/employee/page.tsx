"use client";

import { courses, referenceExams, type ReferenceExam } from "~/app/data/data";
import mainStyle from "./page.module.css";
import styles from "~/app/user/components/shared.module.css";
import Nav from "~/app/user/components/userNav";
import { type ReactNode, useContext } from "react";
import { type EmployeeUser, UserContext } from "~/app/UserContext";
import { LinkButton } from "~/app/_components/links";

export default function EmployeeDashboard() {
    const { baseUser } = useContext(UserContext);

    if (!baseUser) return <p>No user is logged in</p>;
    if (baseUser.type !== "employee") return <p>User logged in is not employee</p>;

    return (
        <div className={styles.page}>
            <Nav scope="employee" />

            <main className={`${styles.main} ${mainStyle.main} main `}>
                <div className={styles.upperDiv}>
                    <p className="title22px">Dashboard</p>
                    <LinkButton href="/user/employee/createExam" className="primaryButton">
                        Create New Exam
                    </LinkButton>
                </div>
                <RenderExamList baseUser={baseUser} />
            </main>
        </div>
    );
}

function RenderExamList({ baseUser }: { baseUser: EmployeeUser }) {
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
                    <LinkButton href="#" className="">View Exam</LinkButton>
                </div>
            </div>
        );
    }

    const examList: ReactNode[] = [];
    const coursesTaught = courses.filter(course => course.courseEmployeeID === baseUser.id + ''); // TODO (james): change to proper comparison when backend is ready for courses

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
