"use client";

import sharedStyles from "~/app/user/components/shared.module.css";
import styles from "./page.module.css";
import Nav from "~/app/user/components/userNav";
import { type ReactElement, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { referenceExams, examScores, type Course, type Section, type ReferenceExam } from "~/app/data/data";
import { UserContext } from "~/app/UserContext";

export default function ViewCourseReport() {
  const [ selectedSection, setSelectedSection ] = useState<string>("All Sections");
  const [ selectedDisplay, setSelectedDisplay ] = useState<string>("Average");
  const [ selectedCourse, setSelectedCourse ] = useState<Course|null>(null);
  const [ sections, setSections ] = useState<Section[]|null>(null);
  const { noOfStudents, noOfExams } = getUpdatedInformation(selectedCourse, selectedSection);
  const searchParams = useSearchParams();
  const { courses } = useContext(UserContext);

  // for every effect that occurs
  useEffect(() => {
    const courseID = searchParams.get("courseID");
    if(!courseID) return;

    const found = courses.find(course => course.courseID === Number(courseID))
    setSelectedCourse(found ?? null);
  }, [courses, searchParams]);
  
  useEffect(() => {
    if(!selectedCourse) return;
    setSections(selectedCourse.sections || null);
  }, [selectedCourse]);

  // rendering the section options
  const RenderSectionOptions = () => {
    const sectionOptions: ReactElement[] = [];
    if(!sections) return sectionOptions;

    sections.forEach((section) => {
      sectionOptions.push(
        <option value={section.sectionName} key={section.sectionName}>Section {section.sectionName}</option>
      );
    });
    return sectionOptions;
  }
  
  if(!selectedCourse) return <p>Selected Course is NULL</p>;

  // main page content
  return (
    <div className="page">
      <Nav scope="employee" />

      <main className={`${styles.main} ${sharedStyles.main} main`}>
        <div className={`${styles.examCourseDiv} ${sharedStyles.examCourseDiv}`}>
          <p className="title22px">{selectedCourse.courseTitle}</p>
          <div className={styles.selectDiv}>
            <label>View Report For:</label>
            <select 
              name="selectedSection" 
              value={ selectedSection }
              onChange={ e => setSelectedSection(e.target.value) }
            >
              <RenderSectionOptions />
              <option value="All Sections">All Sections</option>
            </select>
          </div>
          <div className={styles.selectDiv}>
            <label>Display:</label>
            <select 
              name="selectedDisplay" 
              value={ selectedDisplay }
              onChange={ e => setSelectedDisplay(e.target.value) }
            >
              <option value="Average">Average</option>
              <option value="All Scores">All Scores</option>
            </select>
          </div>
          <hr/>
          <RenderExamContent 
            selectedCourse={selectedCourse} 
            sectionName={selectedSection} 
            noOfStudents={noOfStudents}
            noOfExams={noOfExams}
            selectedDisplay={selectedDisplay} />
        </div>
      </main>
    </div>
  );
}

// getting the updated information
function getUpdatedInformation(selectedCourse: Course|null, selectedSectionName: string) {
  let noOfStudents = 0;
  let noOfExams = 0;
  if(!selectedCourse) return { noOfStudents, noOfExams };

  // get the sections within the course
  const sections = selectedCourse.sections;

  if(selectedSectionName === "All Sections"){
    sections.forEach(section => noOfStudents += section.studentsEnrolled.length);
  } else {
    const selectedSection = sections.find(section => section.sectionName === selectedSectionName);
    if(!selectedSection) return { noOfStudents, noOfExams };

    noOfStudents = selectedSection.studentsEnrolled.length;
  }
  noOfExams = referenceExams.filter(refExam => refExam.courseID === selectedCourse.courseID).length;
  return { noOfStudents, noOfExams };
}

function RenderExamContent({selectedCourse, sectionName, noOfStudents, noOfExams, selectedDisplay}:{selectedCourse: Course|null, sectionName: string, noOfStudents: number, noOfExams: number, selectedDisplay: string}) {
  console.log(selectedDisplay);
  return (
    <div className={`${styles.examReportDiv}`}>
      <p className={styles.subheading}>Course Information</p>
      <div className={styles.information}>
        <p>Section: {sectionName}</p>
        <p>Total number of students: {noOfStudents}</p>
        <p>Total number of exams: {noOfExams}</p>
      </div>

      <p className={styles.subheading}>Exam Report</p>
      { (selectedDisplay === "Average") ? 
        <RenderAverageScores selectedCourse={selectedCourse} sectionName={sectionName} /> : 
        <RenderAllScores selectedCourse={selectedCourse} sectionName={sectionName} /> 
      }
    </div>
  );
}

function RenderAverageScores({selectedCourse, sectionName}:{selectedCourse: Course|null, sectionName: string}) {
  const GetScoreContent = () => {
    const examScoreContent: ReactElement[] = [];
    if(!selectedCourse) return null;

    let counter = 1;
    referenceExams
    .filter(refExam => refExam.courseID === selectedCourse.courseID)
    .map(refExam => {
      const { averageScores, noOfTakers } = getAVGScoresAndNoOfTakers(refExam.examID, sectionName);
        examScoreContent.push(
          <div className={styles.examDetailsAVG} key={refExam.examID}>
            <p>{counter++}</p>
            <p>{refExam.examTitle}</p>
            <p>{refExam.items}</p>
            <p>{averageScores.toFixed(2)}%</p>
            <p>{noOfTakers}</p>
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
        <p className={styles.bold}>Average Score</p>
        <p className={styles.bold}>No. of Takers</p>
      </div>
      <GetScoreContent />
    </div>
  );
}

function getAVGScoresAndNoOfTakers(referencedExamID: string, sectionName: string) {
  let totalScore = 0;
  let noOfTakers = 0;
  
  examScores
  .filter((examScore) => {
    const condition = (sectionName === "All Sections") ? (examScore.referencedExamID === referencedExamID) : (examScore.referencedExamID === referencedExamID && examScore.section === sectionName);
    return condition;
  })
  .map((examScore) => {
    noOfTakers++;
    totalScore += examScore.score;
  });
  const averageScores = totalScore / noOfTakers;
  return { averageScores, noOfTakers };
}

// rendering for all scores
function RenderAllScores({selectedCourse, sectionName}:{selectedCourse: Course|null, sectionName: string}) {
  const GetScoreContent = () => {
    const fullExamScoreContent: ReactElement[] = [];

    if(!selectedCourse) return fullExamScoreContent;

    const StudentExamScores = ({referenceExam}:{referenceExam: ReferenceExam}) => {
      const individualExamScore: ReactElement[] = [];

      examScores
      .filter((examScore) => {
        const condition = (sectionName === "All Sections") ? referenceExam.examID === examScore.referencedExamID :referenceExam.examID === examScore.referencedExamID && examScore.section === sectionName;
        return condition;
      })
      .map((examScore) => {
        const studentNo = examScore.studentID;
        const score = examScore.score;
        const noOfItems = referenceExam.items;
        const grade = ((score/noOfItems)*100).toFixed(2);
        const scoreWithItems = score + "/" + noOfItems;
        
        individualExamScore.push(
          <div className={styles.examDetailsAll} key={studentNo}>
            <p>{studentNo}</p>
            <p>{scoreWithItems}</p>
            <p>{grade}%</p>
          </div>
        )
      });
      return individualExamScore;
    };

    let counter = 1;
    referenceExams
    .filter(refExam => refExam.courseID === selectedCourse.courseID)
    .map((refExam) => {
      fullExamScoreContent.push(
        <div className={styles.examReportDiv} key={refExam.examID}>
          <div className={styles.examHeading}>
            <p>Exam No.: {counter++}</p>
            <p>Title: {refExam.examTitle}</p>
          </div>
          <div className={styles.examDetailsAll}>
            <p className={styles.bold}>Student No.</p>
            <p className={styles.bold}>Score</p>
            <p className={styles.bold}>Grade</p>
          </div>
          <StudentExamScores referenceExam={refExam} />
        </div>
      );
    });
    return fullExamScoreContent;
  }

  return (
    <GetScoreContent />
  );
}

