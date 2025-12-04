"use client"
import { useEffect, useState, type Dispatch, type MouseEvent, type SetStateAction } from "react";
import { RenderDescription, RenderFileSubmissionQuestion, RenderInputQuestion, RenderOptionQuestion, type InputQuestion, type Question, } from "./customExam";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function RenderFileSubmission({questionObjs, setQuestionObjs}:{questionObjs:Question[][], setQuestionObjs:Dispatch<SetStateAction<Question[][]>>}) {
    const [questionId] = useState(() => crypto.randomUUID());

    const questionObj = {
        type: "File Submission",
        id: questionId,
        question: "EGGNOG",
        maxNoOfSubmissions: 3,
        maxFileSize: "100-MB",
        fileSubmissionTypes: [{
            value: "All Files",
            label: "All Files",
        }]
    };
    
    return (
        <>
            <p className="title22px">File Submission</p>
            <RenderFileSubmissionQuestion questionType={"File Submission"} questionId={questionObj.id} setQuestionObjs={setQuestionObjs} currentPage={0} />
        </>
    );
}

export function RenderEssay({questionObjs, setQuestionObjs}:{questionObjs:Question[][], setQuestionObjs:Dispatch<SetStateAction<Question[][]>>}) {
    const [questionId] = useState(() => crypto.randomUUID());
    const router = useRouter();

    const questionObj = {
        type: "Paragraph",
        id: questionId,
        question: "",
        wordLimit: 300
    }

    return (
        <>
            <p className="title22px">File Submission</p>
            <RenderInputQuestion questionType={"Paragraph"} questionId={questionObj.id} setQuestionObjs={setQuestionObjs} currentPage={0} />
        </>
    );
}

export function RenderCustomExam({questionObjs, setQuestionObjs}:{questionObjs:Question[][], setQuestionObjs:Dispatch<SetStateAction<Question[][]>>}) {
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ pages, setPages ] = useState(1);
    const [ previousPageCount, setPreviousPageCount ] = useState(0);

    const [ descriptions, setDescriptions ] = useState<string[]>(["Enter a description."]);
    const [ isStartDisabled, setIsStartDisabled ] = useState(true);
    const [ isEndDisabled, setIsEndDisabled ] = useState(true);

    const router = useRouter();

    useEffect(() => {
        setQuestionObjs(prev => {
            const newPages = [...prev];

            if(pages > previousPageCount) {
                const newQuestions = [...prev];
                const item:Question = { 
                    type: "short-answer", 
                    id: crypto.randomUUID(),
                    question: "Enter a question.",
                    wordLimit: null  
                };
                newQuestions.splice(currentPage, 0, [item]);
                return newQuestions;
            } 

            return newPages;
        });
    }, [pages])

    useEffect(() => {
        setIsStartDisabled(currentPage <= 0);
        setIsEndDisabled(currentPage >= pages-1);
    }, [pages, currentPage])

    const addQuestion = () => {
        console.log("Adding new question to page " + currentPage+1)
        setQuestionObjs(prev => {
            const newPages = [...prev];
            newPages[currentPage] = [
                ...newPages[currentPage] ?? [],
                { 
                    type: "short-answer", 
                    id: crypto.randomUUID(),
                    question: "",
                    wordLimit: null 
                }
            ]
            return newPages;
        });
    };

    const updateQuestionType = (value: string, oldId: string, index: number) => {
        const updated = [...questionObjs];
        if(updated[currentPage] === undefined) return;

        console.log("Updating question type");

        const pageQuestions = [...updated[currentPage]];
        const oldQuestion = pageQuestions[index];

        if(!oldQuestion) return;

        let newQuestion: Question;
        const questionId = crypto.randomUUID();
        if(value === "short-answer" || value === "Paragraph") {;
            newQuestion = { 
                type: value, 
                id: questionId,
                question: "",
                wordLimit: (value === "short-answer") ? null : 300 
            };
        } else if(value === "multiple-choice" || value === "checkbox" || value === "dropbox") {
            newQuestion = { 
                type: value, 
                id: questionId,
                question: "",
                options: []
            };
        } else {
            newQuestion = { 
                type: value, 
                id: questionId,
                question: "",
                maxNoOfSubmissions: 3,
                maxFileSize: "",
                fileSubmissionTypes: [
                    {
                        value: "All Files",
                        label: "All Files"
                    }
                ]
            };
        }

        setQuestionObjs((prev: Question[][]) => {
            const newQuestionObjs = [...prev];
            const pageQuestions = [...(prev[currentPage] ?? [])];
            pageQuestions.forEach((p) => {
                console.log("pageQuestions IDs " + p.id);
            })

            const index = pageQuestions.findIndex(q => q.id === oldId);
            console.log("Index: " + index);

            pageQuestions[index] = newQuestion;
            newQuestionObjs[currentPage] = pageQuestions;
            return newQuestionObjs;
        });     
    }

    const removeQuestion = (index: number) => {
        setQuestionObjs((prev:Question[][]) => prev.filter((_, i) => i !== index));
    };

    const moveQuestion = (direction: number, index: number) => {
        const newquestionObjs = [...questionObjs];
        if(newquestionObjs[currentPage] === undefined) return; 

        const toIndex = index + direction;
        if(toIndex < 0 || toIndex >= newquestionObjs.length) return;
        const [movedItem] = newquestionObjs[currentPage].splice(index, 1);

        console.log(movedItem);
        if(movedItem === undefined) return;
        newquestionObjs[currentPage].splice(toIndex, 0, movedItem);
        setQuestionObjs(newquestionObjs);
    };

    const addNewPage = () => {
        console.log("Adding a new page: ");
        setCurrentPage(currentPage+1);
        setPreviousPageCount(pages);
        setPages(pages+1);
        setDescriptions(prev => [
            ...prev,
            "Enter description."
        ])
        console.log(`currentPage = ${currentPage+1}`);
        console.log(`no of pages = ${pages+1}`);
    }

    const removePage = () => {
        const newquestionObjs = [...questionObjs];

        console.log("Removing a page: ");
        if(newquestionObjs[currentPage] !== undefined) 
            setQuestionObjs(newquestionObjs.filter((_, i) => i !== currentPage));
        setCurrentPage((pages-1 > currentPage || currentPage === 0) ? currentPage : currentPage-1);
        setPreviousPageCount(pages);
        setPages(pages-1);
        
        console.log(`currentPage = ${(pages-1 > currentPage) ? currentPage : currentPage-1}`);
        console.log(`no of pages = ${pages-1}`);
    }

    const navigatePage = (direction: number) => {
        setCurrentPage(currentPage + direction);
        console.log(`Current Page = ${currentPage+direction}`);
    }   

    const movePage = (direction: number) => {
        setQuestionObjs((prev:Question[][]) => {
            const newquestionObjs = [...prev];
            const [item] = newquestionObjs.splice(currentPage, 1);
            if(item === undefined) return questionObjs;
            newquestionObjs.splice(currentPage+direction, 0, item);
            setCurrentPage(currentPage+direction);
            return newquestionObjs;
        });
    }

    return (
        <>
            <p className="title22px">Custom Exam</p>
            <p className="title17px">Page {currentPage+1}</p>
            <div style={{display: "flex", justifyContent: "space-between", margin: "10px 0px"}}>
                <button 
                    onClick={() => addNewPage()}
                    className="secondaryButton"
                >Add A New Page
                </button>
                <button 
                    onClick={ () => removePage()}
                    className="secondaryButton"
                    disabled={isStartDisabled}
                >Remove Page</button>
            </div>
            
            <div style={{display: "flex", justifyContent: "space-between", margin: "10px 0px"}}>
                <button 
                    onClick={ () => navigatePage(-1) }
                    className="secondaryButton"
                    disabled={isStartDisabled}
                >Previous Page</button>
                <button 
                    onClick={ () => navigatePage(1) }
                    className="secondaryButton"
                    disabled={isEndDisabled}
                >Next Page</button>
                <button 
                    onClick={ () => movePage(1) }
                    className="secondaryButton"
                    disabled={isEndDisabled}
                >Move Page Up</button>
                <button 
                    onClick={ () => movePage(-1) }
                    className="secondaryButton"
                    disabled={isStartDisabled}
                >Move Page Down</button>
            </div>

            <RenderDescription descriptions={descriptions} setDescriptions={setDescriptions} currentPage={currentPage} />

            <div style={{width: "100%"}}>
                <button
                    className="primaryButton"
                    style={{ margin: "10px 0px"}}
                    onClick={ () => addQuestion() }
                >Add Question</button>
            </div>

            <p className="title17px" style={{textAlign: "center"}}>QUESTION</p>

            <div>
                { questionObjs[currentPage]?.map((questionObj, index) => {
                    const questionType = questionObj.type;
                    const questionId = questionObj.id;
                    if(!questionType || !questionId) return (<p>Question type is null</p>);
                    
                    console.log(`${questionType}, ${index}`);
                    return (
                        <div 
                            key={questionId} 
                            style={{ 
                                margin: "10px 0px", 
                                border: "1px solid black", 
                                borderRadius: "10px", 
                                padding: "15px"
                            }}
                        >
                            <div 
                                style={{ 
                                    width: "100%", 
                                    display: "grid", 
                                    gridTemplateColumns: "1fr 1fr 7fr 1fr 1fr", 
                                    marginBottom: "10px", 
                                    textAlign: "right"
                                }}>
                                <button
                                    className="secondaryButton" 
                                    onClick={() => moveQuestion(-1, index)}>
                                    Move Up
                                </button>

                                <button
                                    className="secondaryButton" 
                                    onClick={() => moveQuestion(1, index)}>
                                    Move Down
                                </button>

                                <label>                        
                                    Question Type
                                    <select
                                        value={questionType}
                                        onChange={e => updateQuestionType(e.target.value, questionId, index) }
                                    >
                                        <option value="short-answer">Short Answer</option>
                                        <option value="Paragraph">Paragraph</option>
                                        <option value="multiple-choice">Multiple Choice</option>
                                        <option value="checkbox">Checkbox</option>
                                        <option value="dropdown">Dropdown</option>
                                        <option value="File Submission">File Submission</option>
                                    </select>
                                </label>
                                <p></p>
                                <button
                                    className="secondaryButton" 
                                    onClick={() => removeQuestion(index)}>
                                    Remove Question
                                </button>
                            </div>
                                    
                            { (questionType === "short-answer" || questionType === "Paragraph") && 
                                (<RenderInputQuestion 
                                    questionType={questionType}
                                    questionId={questionId}
                                    setQuestionObjs={setQuestionObjs} 
                                    currentPage={currentPage}
                                />) }

                            { (questionType === "multiple-choice" || questionType === "checkbox" || questionType === "dropdown") && 
                                (<RenderOptionQuestion 
                                    questionType={questionType}
                                    questionId={questionId}
                                    setQuestionObjs={setQuestionObjs} 
                                    currentPage={currentPage} 
                                />) }

                            { (questionType === "File Submission") && 
                                (<RenderFileSubmissionQuestion 
                                    questionType={questionType}
                                    questionId={questionId}
                                    setQuestionObjs={setQuestionObjs} 
                                    currentPage={currentPage}
                                />) }
                        </div>
                    );
                }
                )}
            </div>
        </>
    )
}