"use client";

import { courses, referenceExams, type Course, type ReferenceExam } from "~/app/data/data";
import styles from "./page.module.css";
import sharedStyles from "~/app/user/components/shared.module.css";
import Nav from "~/app/user/components/userNav";
import { type ReactNode, useContext, useState } from "react";
import { type Employee, UserContext } from "~/app/UserContext";
import { LinkButton } from "~/app/_components/links";

export default function GenerateExam() {
    const { currentUser } = useContext(UserContext);
    const [ currentPage, setCurrentPage ] = useState<number>(0);
    
    if (!currentUser) return <p>No user is logged in</p>;
    if (currentUser.type !== "employee") return <p>User logged in is not employee</p>;

    const generatedExamRaw  = localStorage.getItem("generatedExam");
    if(!generatedExamRaw) return <p>generatedExamRaw is null</p>

    const {
        examID, 
        employeeID, 
        examTitle, 
        examType, 
        course, 
        sections, 
        dueDate, 
        cutOffDate,
        releaseDate,
        examQuestions,
    } = JSON.parse(generatedExamRaw);

    let sectionFormatted = "";
    sections.forEach((section:string, i:number) => {
        sectionFormatted += section + (i === sections.length-1) ? "" : ", ";
    });

    return (
        <div className={sharedStyles.page}>
            <Nav scope="employee" />

            <main className={`${sharedStyles.main} ${styles.main} main `}>
                <div className={sharedStyles.examCourseDiv}>
                    <p className="title22px">Exam Title: {examTitle}</p>
                    <p className="title17px">Sections: {sectionFormatted}</p>
                    <p className="title17px">Exam Type: {examType}</p>
                    <p>Due Date: {dueDate}</p>
                    <p>Cut-Off Date: {cutOffDate}</p>
                    <p>Release Date: {(releaseDate === "") ? "Manual Release" : releaseDate}</p>
                </div>
                <div className={sharedStyles.examCourseDiv}>
                    <p className="title22px">Page {currentPage+1}</p>
                    
                </div>
            </main>
        </div>
    );
}

function coursesTaught(userID: string) {
    return courses.filter(course => course.courseEmployeeID === userID);
}

function getSectionFromCourseTitle(courseTitle: string) {
    const course = courses.find(course => course.courseTitle === courseTitle);
    return course?.sections;   
}    
