"use client";

import { courses, referenceExams, type Course, type ReferenceExam } from "~/app/data/data";
import styles from "./page.module.css";
import sharedStyles from "~/app/user/components/shared.module.css";
import Nav from "~/app/user/components/userNav";
import { type ReactNode, useContext, useEffect, useState } from "react";
import { type Employee, UserContext } from "~/app/UserContext";
import { LinkButton } from "~/app/_components/links";
import { RenderCustomExam, RenderEssay, RenderFileSubmission } from "./examTypes";
import type { Question } from "./customExam";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type ExamDetails = {
    examID: string;
    employeeID: string;
    examTitle: string;
    examType: string;
    course: string;
    sections: string[];
    dueDate: string;
    cutOffDate: string;
    releaseDate: string;
    examQuestions: Question[][]
}

const formattedDate: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
};

function generateExam(router: AppRouterInstance, examDetails: ExamDetails) {
    const jsonText = JSON.stringify(examDetails);
    console.log(jsonText);
    
    // temporary saving of exam so i can work on the generating of the exam
    localStorage.setItem("generatedExam", jsonText);
    router.push("../exam");
}

export default function CreateExam() {
    const { currentUser } = useContext(UserContext);
    
    if (!currentUser) return <p>No user is logged in</p>;
    if (currentUser.type !== "employee") return <p>User logged in is not employee</p>;
    
    const [ examTitle, setExamTitle ] = useState<string>("")
    const [ examType, setExamType ] = useState<string>("");
    const [ course, setCourse ] = useState<string>("");
    const [ sections, setSections ] = useState<string[]>([]);
    const [ dueDate, setDueDate ] = useState<string>("");
    const [ cutOffDate, setCutOffDate ] = useState<string>("");
    const [ releaseDate, setReleaseDate ] = useState<string>("");
    const [ isManuallyReleasing, setIsManuallyReleasing ] = useState<boolean>(false);

    const [ isChecked, setIsChecked ] = useState<boolean[]>([]);
    const [ showSections, setShowSections ] = useState<boolean>(false);
    
    const [ questionObjs, setQuestionObjs ] = useState<Question[][]>([[]]);
    const [ examID ] = crypto.randomUUID();

    if (!examID) return <p>examID is undefined</p>
    
    const [ examDetails, setExamDetails ] = useState<ExamDetails>({
            examID: examID,
            employeeID: currentUser.employeeNo,
            examTitle,
            examType,
            course,
            sections,
            dueDate,
            cutOffDate,
            releaseDate,
            examQuestions: questionObjs
        });
    const router = useRouter();
    if (!examDetails) return <p>examDetails is undefined</p>
    
    useEffect(() => {
        const sectionObjs = getSectionFromCourseTitle(course);
        if(!sectionObjs) return;
        
        setIsChecked(Array(sectionObjs.length).fill(false))
    }, [course]);

    useEffect(() => {
        setExamDetails({
            examID: examID,
            employeeID: currentUser.employeeNo,
            examTitle,
            examType,
            course,
            sections,
            dueDate: new Date(dueDate).toLocaleString("en-US", formattedDate),
            cutOffDate: new Date(cutOffDate).toLocaleString("en-US", formattedDate),
            releaseDate: new Date(releaseDate).toLocaleString("en-US", formattedDate),
            examQuestions: questionObjs
        })
    }, [questionObjs, examTitle, examType, course, sections, dueDate, cutOffDate, releaseDate])

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
        const sectionObjs = getSectionFromCourseTitle(course);
        
        const updateSections = (section: string, isChecked: boolean, index: number) => {
            setSections(prev => 
                isChecked 
                    ?   [ ...prev, section ]
                    :   prev.filter(s => s !== section)
            );

            setIsChecked(prev => {
                const newIsChecked = [...prev];
                newIsChecked[index] = isChecked;
                return newIsChecked;
            });
        };

        const listOfSections:ReactNode[] = [];
        sectionObjs?.forEach((section, index) => {
            listOfSections.push(
                <label key={section.sectionName}>
                    <input 
                        type="checkbox" 
                        value={section.sectionName} 
                        key={section.sectionName} 
                        checked={isChecked[index]}
                        onChange={e => updateSections(e.target.value, e.target.checked, index)}
                    />
                    {section.sectionName}
                </label>
            );
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
                        <input 
                            type="text" 
                            value={examTitle}
                            className={styles.examTitle}
                            onChange={e => setExamTitle(e.target.value)}
                        />
                    </div>  
                    <div className={styles.rowDiv}>
                        <label>
                            Exam Type
                            <select 
                                value={examType}
                                onChange={e => setExamType(e.target.value)}
                            >
                                <option value="">Select option</option>
                                <option value="File Submission">File Submission</option>
                                <option value="Create Exam">Create Custom Exam</option>
                                <option value="Essay">Essay</option>
                            </select>  
                        </label>  
                        <label>
                            Course
                            <select 
                                value={course}
                                onChange={e => {
                                    setCourse(e.target.value);
                                    setShowSections((e.target.value !== ""));
                                }}
                            >
                                <option value="">Select option</option>
                                <RenderCourseOptions />
                            </select>  
                        </label>  
                        { showSections && (<label>
                            Section
                            <RenderSectionOptions />
                        </label>) }
                    </div>

                    <div className={styles.rowDiv}>
                        <label>
                            Due Date
                            <input 
                                type="datetime-local" 
                                value={dueDate}
                                onChange={e => setDueDate(e.target.value)}
                            />
                        </label>
                        <label>
                            Cut-Off Date
                            <input 
                                type="datetime-local" 
                                value={cutOffDate}
                                onChange={e => setCutOffDate(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className={styles.rowDiv}>
                        <label>
                            Exam Release Date
                            <input 
                                type="datetime-local"
                                value={releaseDate}
                                onChange={e => {
                                    setReleaseDate(e.target.value);
                                    setIsManuallyReleasing(false);
                                }}
                            />
                        </label>
                        <label>
                            <input 
                                type="radio"
                                checked={isManuallyReleasing}
                                onChange={e => {
                                    setIsManuallyReleasing(!isManuallyReleasing);
                                    setReleaseDate("");
                                }}
                            />
                            Manually Release Exam
                        </label>
                    </div>
                    
                </div>

                <div className={sharedStyles.examCourseDiv}>
                    { ((examType === "File Submission") && (<RenderFileSubmission questionObjs={questionObjs} setQuestionObjs={setQuestionObjs}/>))}
                    { (examType === "Essay") && (<RenderEssay questionObjs={questionObjs} setQuestionObjs={setQuestionObjs}/>)}
                    { (examType === "Create Exam") && (<RenderCustomExam questionObjs={questionObjs} setQuestionObjs={setQuestionObjs}/>)}
                    <button 
                        className="primaryButton"
                        disabled={examType === ""}
                        onClick={() => generateExam(router, examDetails)}
                    >
                        Create Exam
                    </button>
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
