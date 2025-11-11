"use client";

import styles from "./page.module.css";
import Nav from "@/app/user/components/userNav";
import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { courses, referenceExams, examScores, Course, Section, students, ReferenceExam } from "@/app/data/data";

export default function ViewCourseReport() {
  // for choosing a section
  const [ selectedSection, setSelectedSection ] = useState("all");
  // for choosing to display either average or all scores
  const [ selectedDisplay, setSelectedDisplay ] = useState("average");
  // getting the selected course like "CMSC 135"
  const [ selectedCourse, setSelectedCourse ] = useState<Course|null>(null);

  // getting the course from the courseID
  const searchParams = useSearchParams();
  useEffect(() => {
    const courseID = searchParams.get("courseID");
    if(!courseID) return;

    const found = courses.find(course => course.courseID === courseID)
    setSelectedCourse(found || null);
  }, [searchParams]);
  
  // just for displaying the content
  const [ display, setDisplay ] = useState(renderExamContent(selectedCourse,"All Sections", 33, 3, selectedDisplay));
  
  // getting the sections from the selectedCourse
  const [ sections, setSections ] = useState<Section[]|null>(null);
  useEffect(() => {
    if(!selectedCourse) return;
    setSections(selectedCourse.sections || null);
  }, [selectedCourse]);

  // rendering the section options
  const renderSectionOptions = () => {
    let sectionOptions: Array<ReactElement>;
    sectionOptions = [];
    if(!sections) return sectionOptions;

    sections.forEach((section) => {
      sectionOptions.push(
        <option value={section.sectionName} key={section.sectionName}>Section {section.sectionName}</option>
      );
    });
    return sectionOptions;
  }

  if(!selectedCourse) return;

  // main page content
  return (
    <div className={styles.page}>
      { Nav("professor") }

      <main className={styles.main}>
        <div className={styles.courseDiv}>
          <p className={styles.title}>{selectedCourse.courseTitle}</p>

          <label>View Report For</label>
          <select 
            name="selectedSection" 
            value={ selectedSection }

            onChange={(e) => {
              const newSelectedSection = e.target.value;
              setSelectedSection(newSelectedSection);
              const { noOfStudents, noOfExams } = getUpdatedInformation(selectedCourse, newSelectedSection);
              setDisplay(renderExamContent(selectedCourse, newSelectedSection, noOfStudents, noOfExams, selectedDisplay));
            }}
          >
            { renderSectionOptions() }
            <option value="All Sections">All Sections</option>
          </select>
          
          <label>Display</label>
          <select 
            name="selectedDisplay" 
            value={ selectedDisplay }
            onChange={(e) => {
              const newSelectedDisplay = e.target.value;
              setSelectedDisplay(newSelectedDisplay);

              const { noOfStudents, noOfExams } = getUpdatedInformation(selectedCourse, selectedSection);
              setDisplay(renderExamContent(selectedCourse, selectedSection, noOfStudents, noOfExams, newSelectedDisplay));
            }}
          >
            <option value="Average">Average</option>
            <option value="All Scores">All Scores</option>
          </select>
          { display }
          
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
    sections.forEach(section => noOfStudents += section.noOfStudents);
  } else {
    let selectedSection = sections.find(section => section.sectionName === selectedSectionName);
    if(!selectedSection) return { noOfStudents, noOfExams };

    noOfStudents = selectedSection.noOfStudents;
  }
  noOfExams = selectedCourse.examIDs.length;
  return { noOfStudents, noOfExams };
}

function renderExamContent(selectedCourse: Course|null, sectionName: string, noOfStudents: number, noOfExams: number, selectedDisplay: string) {
  return (
    <div className={styles.courseDiv}>
      <p>Section:</p>
      <p className={styles.title}>{sectionName}</p>

      <p>Course Information</p>
      <div className={styles.information}>
        <p>Total number of students: {noOfStudents}</p>
        <p>Total number of exams: {noOfExams}</p>
      </div>

      <p>Exam Report</p>
      { (selectedDisplay === "average") ? renderAverageScores(selectedCourse, sectionName) : renderAllScores(selectedCourse, sectionName) }
    </div>
  );
}

function renderAverageScores(selectedCourse: Course|null, sectionName: string) {
  const getScoreContent = () => {
    let examScoreContent: Array<ReactElement>;
    examScoreContent = [];
    if(!selectedCourse) return null;

    let counter = 1;
    referenceExams.forEach((referenceExam) => {
      if(referenceExam.courseID === selectedCourse.courseID){
        const { averageScores, noOfTakers } = getAVGScoresAndNoOfTakers(referenceExam.examID, sectionName);
        examScoreContent.push(
          <div className={styles.examDetails} key={referenceExam.examID}>
            <p>{counter++}</p>
            <p>{referenceExam.examTitle}</p>
            <p>{referenceExam.items}</p>
            <p>{averageScores.toFixed(2)}</p>
            <p>{noOfTakers}</p>
          </div>
        );
      }
    });
    return examScoreContent;
  }

  return (
    <div>
      <div className={styles.examDetails}>
        <p>Exam No.</p>
        <p>Exam Title</p>
        <p>No. of Items</p>
        <p>Average Score</p>
        <p>No. of Takers</p>
      </div>
      { getScoreContent() }
    </div>
  );
}

function getAVGScoresAndNoOfTakers(referencedExamID: string, sectionName: string) {
  let totalScore = 0;
  let noOfTakers = 0;
  
  examScores.forEach((examScore) => {
    const condition = (sectionName === "All Sections") ? (examScore.referencedExamID === referencedExamID) : (examScore.referencedExamID === referencedExamID && examScore.section === sectionName);
    if (condition) {
      noOfTakers++;
      totalScore += examScore.score;
    }
  })
  const averageScores = totalScore / noOfTakers;
  return { averageScores, noOfTakers };
}

// rendering for all scores
function renderAllScores(selectedCourse: Course|null, sectionName: string) {
  const getScoreContent = () => {
    let fullExamScoreContent: Array<ReactElement>;
    fullExamScoreContent = [];
    if(!selectedCourse) return null;

    const studentExamScores = (referenceExam: ReferenceExam) => {
      let individualExamScore: Array<ReactElement>;
      individualExamScore = [];

      examScores.forEach((examScore) => {
        const student = students.find(student => student.userID === examScore.studentID);
        if(!student) return;

        if(referenceExam.examID === examScore.referencedExamID){
          const studentNo = student.studentNo;
          const score = examScore.score;
          const noOfItems = referenceExam.items;
          const grade = ((score/noOfItems)*100).toFixed(2);
          const scoreWithItems = score + "/" + noOfItems;
          
          individualExamScore.push(
            <div className={styles.examDetails} key={examScore.examScoreID}>
              <p>{studentNo}</p>
              <p>{scoreWithItems}</p>
              <p>{grade}</p>
            </div>
          )
        }
        
      });
      return individualExamScore;
    };

    let counter = 1;
    referenceExams.forEach((referenceExam) => {
      if(referenceExam.courseID === selectedCourse.courseID){
        
        fullExamScoreContent.push(
          <div>
            <p>Exam No.:{counter++}</p>
            <p>Title:{referenceExam.examTitle}</p>
            { studentExamScores(referenceExam) }
          </div>
        );
      }
    });
    return fullExamScoreContent;
  }

  return (
    <div>
      { getScoreContent() }
    </div>
  );
}

