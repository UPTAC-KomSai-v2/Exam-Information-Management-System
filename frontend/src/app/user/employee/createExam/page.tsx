"use client";

import { courses, referenceExams, type Course, type ReferenceExam } from "~/app/data/data";
import styles from "./page.module.css";
import sharedStyles from "~/app/user/components/shared.module.css";
import Nav from "~/app/user/components/userNav";
import { type ReactNode, useContext, useEffect, useState } from "react";
import { type Employee, UserContext } from "~/app/UserContext";
import { LinkButton } from "~/app/_components/links";
import { RenderCustomExam, RenderEssay, RenderFileSubmission } from "./examTypes";
import { type Question } from "./customExams";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type ExamDetails = {
    examID: string;
    examTitle: string;
    examType: string;
    course: string;
    sections: string[];
    pageDescriptions: string[];
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

function previewExam(router: AppRouterInstance, examDetails: ExamDetails) {
    const jsonText = JSON.stringify(examDetails);
    console.log(jsonText);
    
    // temporary saving of exam so i can work on the generating of the exam
    localStorage.setItem("generatedExam", jsonText);
    router.push("../exam");
}

const toDateTimeLocal = (enUS: string) => {
    console.log("enUS: " + enUS);
    if(enUS === "Invalid Date" || enUS === "") return "";

    const clean = enUS.replace(" at ", " ");
    const d = new Date(Date.parse(clean));
    
    console.log("d: " + d);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
}

export default function CreateExam() {
    const { currentUser } = useContext(UserContext);
    const rawData = localStorage.getItem("generatedExam");

    const examID = useState(() => crypto.randomUUID())[0];
    const parsedData = useState<ExamDetails>((rawData) ? JSON.parse(rawData) : {
            examID,
            examTitle: "",
            examType: "",
            course: "",
            sections: [],
            pageDescriptions: [], 
            dueDate: "",
            cutOffDate: "",
            releaseDate: "",
            examQuestions: [[]]
        })[0];

    const [ examTitle, setExamTitle ] = useState<string>(parsedData.examTitle);
    const [ examType, setExamType ] = useState<string>(parsedData.examType);
    const [ course, setCourse ] = useState<string>(parsedData.course);
    const [ sections, setSections ] = useState<string[]>(parsedData.sections);
    const [ pageDescriptions, setPageDescriptions ] = useState<string[]>(parsedData.pageDescriptions)
    const [ dueDate, setDueDate ] = useState<string>(toDateTimeLocal(parsedData.dueDate));
    const [ cutOffDate, setCutOffDate ] = useState<string>(toDateTimeLocal(parsedData.cutOffDate));
    const [ releaseDate, setReleaseDate ] = useState<string>(toDateTimeLocal(parsedData.releaseDate));
    const [ isManuallyReleasing, setIsManuallyReleasing ] = useState<boolean>(false);
    
    const [ showSections, setShowSections ] = useState<boolean>(false);
    
    const [ questionObjs, setQuestionObjs ] = useState<Question[][]>(parsedData.examQuestions);
    
    const [ examDetails, setExamDetails ] = useState<ExamDetails>(parsedData);
    const router = useRouter();

    useEffect(() => {
        setShowSections(course !== "");
    }, [])

    useEffect(() => {
        setExamDetails({
            examID,
            examTitle,
            examType,
            course,
            sections,
            pageDescriptions,
            dueDate: new Date(dueDate).toLocaleString("en-US", formattedDate),
            cutOffDate: new Date(cutOffDate).toLocaleString("en-US", formattedDate),
            releaseDate: new Date(releaseDate).toLocaleString("en-US", formattedDate),
            examQuestions: questionObjs
        })
    }, [questionObjs, examTitle, examType, course, sections, dueDate, cutOffDate, releaseDate])

    if (!currentUser) return <p>No user is logged in</p>;
    if (currentUser.type !== "employee") return <p>User logged in is not employee</p>;
    if (!examID) return <p>examID is undefined</p>
    if (!examDetails) return <p>examDetails is undefined</p>
    console.log(examDetails);

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
        };

        const listOfSections:ReactNode[] = [];
        sectionObjs?.forEach((section, index) => {
            listOfSections.push(
                <label key={section.sectionName}>
                    <input 
                        type="checkbox" 
                        value={section.sectionName} 
                        key={section.sectionName} 
                        checked={sections.some(s => s === section.sectionName)}
                        onChange={e => updateSections(e.target.value, e.target.checked, index)}
                    />
                    {section.sectionName}
                </label>
            );
        });
        return listOfSections;
    }

    const updateExamType = (examType: string) => {
        setExamType(examType);
        const id = crypto.randomUUID();
        setQuestionObjs(() => {
            const newQuestionObjs:Question[][] = [];
            if(examType !== "") {
                newQuestionObjs.push([ 
                    (examType === "File Submission") ? {
                            type: examType,
                            id,
                            question: "",
                            maxNoOfSubmissions: 3,
                            maxFileSize: "100 MB",
                            fileSubmissionTypes: [{ value: "All Files", label: "All Files" }]
                        }
                        : (examType === "Essay") ? {
                            type: "Paragraph",
                            id,
                            question: "",
                            wordLimit: 300
                        } 
                        : {
                            type: "Short Answer",
                            id,
                            question: "",
                            wordLimit: null
                        }
                ]);
            }
            return newQuestionObjs;
        });
        setPageDescriptions([]);
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
                                onChange={e => updateExamType(e.target.value)}
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
                    { (examType === "Create Exam") && (<RenderCustomExam pageDescriptions={pageDescriptions} setPageDescriptions={setPageDescriptions} questionObjs={questionObjs} setQuestionObjs={setQuestionObjs}/>)}
                    <button 
                        className="primaryButton"
                        disabled={examType === ""}
                        onClick={() => previewExam(router, examDetails)}
                    >
                        Preview Exam
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
