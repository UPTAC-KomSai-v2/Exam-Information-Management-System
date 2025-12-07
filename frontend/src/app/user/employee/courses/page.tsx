"use client";

import sharedStyles from "~/app/user/components/shared.module.css";
import styles from "./page.module.css";
import Nav from "~/app/user/components/userNav";
import Logo from "~/app/_components/logo";
import { type ReactElement, useContext, useState } from "react";

import { UserContext } from "~/app/UserContext";
import { LinkButton } from "~/app/_components/links";

export default function EmployeeCourses() {
    const [ showOverlay, setShowOverlay ]  = useState(false);
    const { baseUser, courses, userExams } = useContext(UserContext);

    if (!baseUser) return <p>No user is logged in</p>;
    if (baseUser.type !== "employee") return <p>User logged in is not employee</p>;

    const coursesArray: ReactElement[] = [];

    const coursesTaught = courses.filter(course => {
        return course.courseEmployeeID === baseUser.id
    });

    coursesTaught.forEach((course) => {
        const fullCourseDescription = course.courseDescription + " | " + course.academicYear + " " + course.semester;
        const noOfExams = userExams.filter(exam => exam.courseID === course.courseID).length;
        coursesArray.push(addCourseToPage(
            course.courseID,
            course.courseTitle,
            fullCourseDescription,
            noOfExams
        ))
    });

    return (
        <div className={`${sharedStyles.page} ${styles.page}`}>
            <Nav scope="employee" />

            <main className={`${sharedStyles.main} ${styles.main} main`}>
                <p className="title22px">Courses</p>

                { coursesArray }

                <button
                className={styles.enrollCourse}
                onClick={() => setShowOverlay(true)}
                >
                    +
                </button>

                {showOverlay && (
                    <div className={styles.filter}></div>
                )}
                {showOverlay && (
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
                        >
                            Submit
                        </button>

                        <button 
                            className={styles.exitOverlay} 
                            onClick={() => setShowOverlay(false)}
                        >
                            ✖
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

function addCourseToPage(courseID: number, courseTitle: string, courseDescription: string, noOfExams: number) {
    return (
        <div className={sharedStyles.examCourseDiv} key={courseID}>
            <p className="title22px">{courseTitle}</p>
            <p className={sharedStyles.description}>{courseDescription}</p>
            <div className={sharedStyles.information}>
                <p>Total Exams: {noOfExams}</p>

                <LinkButton href={`/user/employee/courses/viewCourseReport?courseID=${courseID}`} className="">
                    View Course Report
                </LinkButton>
            </div>
        </div>
    );
}
