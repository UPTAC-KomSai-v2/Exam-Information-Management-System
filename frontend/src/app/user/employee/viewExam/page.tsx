"use client";

import sharedStyles from "~/app/user/components/shared.module.css";
import styles from "./page.module.css";
import Nav from "~/app/user/components/userNav";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { examScores, students, type ReferenceExam, type Course, examContent, referenceExams, type ExamContent } from "~/app/data/data";
import {
  loadExamData,
  calculateExamStatistics,
  getStudentPerformanceData,
  formatExamDetails,
  isDataReady,
  type ExamStatistics,
  type StudentScore,
} from "./examData";

export default function ViewExam() {
  const searchParams = useSearchParams();
  const examID = searchParams.get("examID") || "";
  const [exam, setExam] = useState<ExamContent | null>(null);
  const [examTitle, setExamTitle] = useState<string>("Unknown Exam");

  useEffect(() => {
    if (examID) {
      // Find the exam content
      const foundExam = examContent.find(e => e.examID === examID);
      setExam(foundExam || null);

      // Find the exam title from referenceExams
      const refExam = referenceExams.find(e => e.examID === examID);
      if (refExam) {
        setExamTitle(refExam.examTitle);
      }
    }
  }, [examID]);

  const renderQuestion = (question: any, index: number) => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <div key={question.id} className={styles.questionContainer}>
            <div className={styles.questionHeader}>
              <span className={styles.questionNumber}>Q{index + 1}</span>
              <span className={`${styles.questionType} ${styles.multipleChoice}`}>Multiple Choice</span>
              <p className={styles.questionText}>{question.question}</p>
            </div>
            <div className={styles.optionsContainer}>
              {["A", "B", "C", "D"].map((option) => (
                <label key={option} className={styles.optionLabel}>
                  <input type="radio" name={`q${question.id}`} value={option} className={styles.radio} />
                  <span className={styles.optionText}>{option}. Option {option}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case "short-answer":
        return (
          <div key={question.id} className={styles.questionContainer}>
            <div className={styles.questionHeader}>
              <span className={styles.questionNumber}>Q{index + 1}</span>
              <span className={`${styles.questionType} ${styles.shortAnswer}`}>Short Answer</span>
              <p className={styles.questionText}>{question.question}</p>
            </div>
            {question.wordLimit && (
              <p className={styles.wordLimit}>Word Limit: {question.wordLimit} words</p>
            )}
            <textarea
              className={styles.textarea}
              placeholder="Enter your answer here..."
              maxLength={question.wordLimit ? question.wordLimit * 6 : undefined}
            />
          </div>
        );
      case "paragraph":
        return (
          <div key={question.id} className={styles.questionContainer}>
            <div className={styles.questionHeader}>
              <span className={styles.questionNumber}>Q{index + 1}</span>
              <span className={`${styles.questionType} ${styles.paragraph}`}>Essay</span>
              <p className={styles.questionText}>{question.question}</p>
            </div>
            {question.wordLimit && (
              <p className={styles.wordLimit}>Word Limit: {question.wordLimit} words</p>
            )}
            <textarea
              className={`${styles.textarea} ${styles.paragraphTextarea}`}
              placeholder="Write your essay here..."
              maxLength={question.wordLimit ? question.wordLimit * 6 : undefined}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page">
      <Nav scope="employee" />
      <main className={`${styles.main} ${sharedStyles.main} main`}>
        <div className={styles.examHeader}>
          <h1 className={styles.examTitle}>{examTitle}</h1>
          <p className={styles.examInfo}>View exam details and questions below</p>
        </div>
        {exam ? (
          <div className={styles.questionsSection}>
            {exam.examQuestions[0]?.map((question, index) => renderQuestion(question, index))}
          </div>
        ) : (
          <p className={styles.noContent}>No exam content found.</p>
        )}
      </main>
    </div>
  );
}