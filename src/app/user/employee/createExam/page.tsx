"use client";

import { courses, referenceExams, type Course, type ReferenceExam } from "~/app/data/data";
import styles from "./page.module.css";
import sharedStyles from "~/app/user/components/shared.module.css";
import Nav from "~/app/user/components/userNav";
import { type ReactNode, useContext, useState } from "react";
import { type Employee, UserContext } from "~/app/UserContext";
import { LinkButton } from "~/app/_components/links";
import { RenderCustomExam, RenderEssay, RenderFileSubmission } from "./examTypes";

export default function createExam() {
    const { currentUser } = useContext(UserContext);
    const [ examTypeValue, setExamTypeValue ] = useState("");
    const [ courseValue, setCourseValue ] = useState("");
    const [ course, setCourse ] = useState<Course|null>(null);
    const [ sections, setSections ] = useState("");
    const [ sectionValue, setSectionValue ] = useState("");
    const [ showSections, setShowSections ] = useState(false);

    if (!currentUser) return <p>No user is logged in</p>;
    if (currentUser.type !== "employee") return <p>User logged in is not employee</p>;

    const RenderCourseOptions = () => {
        const courses = coursesTaught(currentUser.userID);
        const listOfCourses:ReactNode[] = [];
        courses.forEach((courseTaught) => {
            listOfCourses.push(
                <option value={courseTaught.courseTitle} key={courseTaught.courseTitle}>{courseTaught.courseTitle}</option>
            )
        });
        return listOfCourses;
    }

    const RenderSectionOptions = () => {
        const sections = getSectionFromCourseTitle(courseValue);
        console.log(sections);
        const listOfSections:ReactNode[] = [];
        sections?.forEach((section) => {
            listOfSections.push(<option value={section.sectionName} key={section.sectionName}>{section.sectionName}</option>);
        });
        return listOfSections;
    }

    return (
        <div className={sharedStyles.page}>
            <Nav scope="employee" />

            <main className={`${sharedStyles.main} ${styles.main} main `}>
                <div className={sharedStyles.examCourseDiv}>
                    <p className="title22px">Creating a New Exam</p>
                    <div className={styles.rowDiv}>
                        <label>Exam Title</label>
                        <input type="text" className={styles.examTitle}/>
                    </div>  
                    <div className={styles.rowDiv}>
                        <label>
                            Exam Type
                            <select 
                                value={examTypeValue}
                                onChange={e => setExamTypeValue(e.target.value)}
                            >
                                <option value="">Select option</option>
                                <option value="file-submission">File Submission</option>
                                <option value="create-exam">Create Custom Exam</option>
                                <option value="essay">Essay</option>
                            </select>  
                        </label>  
                        <label>
                            Course
                            <select 
                                value={courseValue}
                                onChange={(e) => {
                                    setCourseValue(e.target.value);
                                    setShowSections((e.target.value !== ""));
                                }}
                            >
                                <option value="">Select option</option>
                                <RenderCourseOptions />
                            </select>  
                        </label>  
                        { showSections && (<label>
                            Section
                            <select 
                                value={sectionValue}
                                onChange={(e) => {setSectionValue(e.target.value)}}
                            >
                                <option value="">Select option</option>
                                <RenderSectionOptions />
                            </select>  
                        </label>) }
                    </div>

                    <div className={styles.rowDiv}>
                        <label>
                            Due Date
                            <input type="datetime-local" />
                        </label>
                        <label>
                            Cut-Off Date
                            <input type="datetime-local" />
                        </label>
                    </div>

                    <div className={styles.rowDiv}>
                        <label>
                            Exam Release Date
                            <input type="datetime-local"/>
                        </label>
                        <label>
                            <input type="radio"/>
                            Manually Release Exam
                        </label>
                    </div>
                    
                </div>

                <div className={sharedStyles.examCourseDiv}>
                    { (examTypeValue === "file-submission") && (<RenderFileSubmission />)}
                    { (examTypeValue === "essay") && (<RenderEssay />)}
                    { (examTypeValue === "create-exam") && (<RenderCustomExam />)}
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
