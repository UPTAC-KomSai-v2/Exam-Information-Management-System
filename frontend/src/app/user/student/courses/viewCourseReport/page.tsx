"use client";

import sharedStyles from "~/app/user/components/shared.module.css";
import styles from "./page.module.css";
import Nav from "~/app/user/components/userNav";
import { type ReactElement, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { referenceExams, examScores, type Course, type Section, type ReferenceExam } from "~/app/data/data";
import { getEnrolledSection } from "../../page";
import { type StudentUser, UserContext } from "~/app/UserContext";
import { getNoOfExamsPerSection } from "../page";

export default function ViewCourseReport() {
    const [ selectedCourse, setSelectedCourse ] = useState<Course|null>(null);
    const [ section, setSection ] = useState<Section|undefined>(undefined);
    const { baseUser, courses } = useContext(UserContext);
    const [ noOfExams, setNoOfExams ] = useState<number>(0);
    const searchParams = useSearchParams();

    useEffect(() => {
        const courseID = searchParams.get("courseID");
        if (!courseID) return;

        const found = courses.find(course => course.courseID === Number(courseID));
        setSelectedCourse(found ?? null);
    }, [courses, searchParams]);

    useEffect(() => {
        if (!selectedCourse || !baseUser) return;
        if (baseUser.type !== "student") return;

        setSection(getEnrolledSection(selectedCourse, baseUser));
    }, [selectedCourse, baseUser]);

    useEffect(() => {
        if (!selectedCourse || !section || !baseUser) return;
        if (baseUser.type !== "student") return;

        setNoOfExams(getNoOfExamsPerSection(section, baseUser));
    }, [selectedCourse, section, baseUser]);
    
    if (!baseUser) return <p>No user is logged in</p>;
    if (baseUser.type !== "student") return <p>User logged in is not a student</p>;
    if (!selectedCourse) return <p>there is no selected course</p>;
    
    return (
        <div className="page">
            <Nav scope="student" />

            <main className={`${styles.main} ${sharedStyles.main} main`}>
                <div className={`${styles.examCourseDiv} ${sharedStyles.examCourseDiv}`}>
                    <p className="title22px">
                        {selectedCourse.courseTitle} - {section?.sectionName}
                    </p>

                    <RenderExamContent 
                        selectedCourse={selectedCourse} 
                        noOfExams={noOfExams}
                        baseUser={baseUser}
                    />
                </div>
            </main>
        </div>
    );
}

function RenderExamContent({ selectedCourse, noOfExams, baseUser }:{ selectedCourse: Course | null, noOfExams: number, baseUser: StudentUser }) {
    return (
        <div className={`${styles.examReportDiv}`}>
            <p className={styles.subheading}>Course Information</p>
            <div className={styles.information}>
                <p>Total number of exams: {noOfExams}</p>
            </div>

            <p className={styles.subheading}>Exam Report</p>
            <RenderScores selectedCourse={selectedCourse} baseUser={baseUser}/>
        </div>
    );
}

function RenderScores({ selectedCourse, baseUser }:{ selectedCourse: Course | null, baseUser: StudentUser }) {
    const GetScoreContent = () => {
        const examScoreContent: ReactElement[] = [];

        if(!selectedCourse) return null;

        let counter = 1;
        referenceExams
            .filter(refExam => refExam.courseID === selectedCourse.courseID)
            .map(refExam => {
                console.log(baseUser.id);
                const { score, grade } = getScoreAndGrade(refExam, baseUser.id);
                    examScoreContent.push(
                        <div className={styles.examDetailsAVG} key={refExam.examID}>
                            <p>{counter++}</p>
                            <p>{refExam.examTitle}</p>
                            <p>{refExam.items}</p>
                            <p>{score}</p>
                            <p>{grade.toFixed(2)}%</p>
                        </div>
                    );
            });
        return examScoreContent;
    }

    return (
        <div>
            <div className={styles.examDetailsAVG}>
                <p className={styles.bold}>Exam No.</p>
                <p className={styles.bold}>Exam Title</p>
                <p className={styles.bold}>No. of Items</p>
                <p className={styles.bold}>Score</p>
                <p className={styles.bold}>Grade</p>
            </div>
            <GetScoreContent />
        </div>
    );
}

function getScoreAndGrade(referencedExam: ReferenceExam, studentID: number) {
    const studentExam = examScores.find((examScore) => {
        return referencedExam.examID === examScore.referencedExamID && examScore.studentID === studentID;
    });

    let score = 0;
    let grade = 0;
    if(studentExam === undefined) {
        console.log("STUDENT EXAM IS UNDEFINED");
        return { score, grade };
    }

    score = studentExam.score;
    grade = (score / referencedExam.items) * 100;
    return { score, grade };
}
