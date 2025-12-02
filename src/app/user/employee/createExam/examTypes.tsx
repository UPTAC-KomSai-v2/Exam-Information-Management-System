import { useEffect, useRef, useState, type MouseEvent } from "react";
import { RenderDescription, RenderFileSubmissionQuestion, RenderInputQuestion, RenderOptionQuestion, type InputQuestion, type Question, } from "./customExam";
import { LinkButton } from "~/app/_components/links";

export function RenderFileSubmission() {
    return (
        <>
            <p className="title22px">File Submission</p>
            <RenderFileSubmissionQuestion questionType={null} setQuestions={null} currentPage={0} />
            <button className="primaryButton">
                Create Exam
            </button>
        </>
    );
}



export function RenderEssay() {
    return (
        <>
            <p className="title22px">File Submission</p>
            <RenderInputQuestion questionType="paragraph" setQuestions={null} currentPage={0} />
            
            <button className="primaryButton">
                Create Exam
            </button>
        </>
    );
}

export function RenderCustomExam() {
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ pages, setPages ] = useState(1);
    const [ previousPageCount, setPreviousPageCount ] = useState(0);
    const [ questions, setQuestions ] = useState<Question[][]>([
        [{ 
            type: "short-answer", 
            id: crypto.randomUUID(),
            question: "Enter a question.",
            wordLimit: null 
        }]
    ]);
    const [ descriptions, setDescriptions ] = useState<string[]>(["Enter a description."]);
    const [ isStartDisabled, setIsStartDisabled ] = useState(true);
    const [ isEndDisabled, setIsEndDisabled ] = useState(true);

    useEffect(() => {
        setQuestions(prev => {
            const newPages = [...prev];
            // pages were added

            if(pages > previousPageCount) {
                // insert the new page into the array
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
        setQuestions(prev => {
            const newPages = [...prev];
            newPages[currentPage] = [
                ...newPages[currentPage] ?? [],
                { 
                    type: "short-answer", 
                    id: crypto.randomUUID(),
                    question: "Enter a question.",
                    wordLimit: null 
                }
            ]
            return newPages;
        });
    };

    const updateQuestionType = (value: string, id: string, index: number) => {
        const updated = [...questions];
        if(updated[currentPage] === undefined) return;

        if(value === "short-answer" || value === "paragraph") {
            updated[currentPage][index] = { 
                type: value, 
                id: id,
                question: "Enter a question.",
                wordLimit: (value === "short-answer") ? null : 300 
            };
        } else if(value === "multiple-choice" || value === "checkbox" || value === "dropbox") {
            updated[currentPage][index] = { 
                type: value, 
                id: id,
                question: "Enter a question.",
                options: []
            };
        } else {
            updated[currentPage][index] = { 
                type: value, 
                id: id,
                question: "Enter a question.",
                maxNoOfSubmissions: 5,
                maxFileSize: "100-MB",
                fileSubmissionTypes: ["all-files"]
            };
        }
        setQuestions(updated);
    }

    const removeQuestion = (index: number) => {
        setQuestions(prev => prev.filter((_, i) => i !== index));
    };

    const moveQuestion = (direction: number, index: number) => {
        const newQuestions = [...questions];
        if(newQuestions[currentPage] === undefined) return; 

        const toIndex = index + direction;
        if(toIndex < 0 || toIndex >= newQuestions.length) return;
        const [movedItem] = newQuestions[currentPage].splice(index, 1);

        console.log(movedItem);
        if(movedItem === undefined) return;
        newQuestions[currentPage].splice(toIndex, 0, movedItem);
        setQuestions(newQuestions);
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
        const newQuestions = [...questions];

        console.log("Removing a page: ");
        if(newQuestions[currentPage] !== undefined) 
            setQuestions(newQuestions.filter((_, i) => i !== currentPage));
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
        setQuestions(prev => {
            const newQuestions = [...prev];
            const [item] = newQuestions.splice(currentPage, 1);
            if(item === undefined) return questions;
            newQuestions.splice(currentPage+direction, 0, item);
            setCurrentPage(currentPage+direction);
            return newQuestions;
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
                    onClick={ () => navigatePage(1) }
                    className="secondaryButton"
                    disabled={isEndDisabled}
                >Next Page</button>
                <button 
                    onClick={ () => navigatePage(-1) }
                    className="secondaryButton"
                    disabled={isStartDisabled}
                >Previous Page</button>
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

            <p className="title17px" style={{textAlign: "center"}}>QUESTIONS</p>

            <div>
            { questions[currentPage]?.map((question, index) => {
                const questionType = question.type;
                const questionId = question.id;
                if(!questionType || !questionId) return (<p>Question type is null</p>);

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
                        style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr 7fr 1fr 1fr", marginBottom: "10px", textAlign: "right"}}>
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
                                <option value="paragraph">Paragraph</option>
                                <option value="multiple-choice">Multiple Choice</option>
                                <option value="checkbox">Checkbox</option>
                                <option value="dropdown">Dropdown</option>
                                <option value="file-submission">File Submission</option>
                            </select>
                        </label>
                        <p></p>
                        <button
                            className="secondaryButton" 
                            onClick={() => removeQuestion(index)}>
                            Remove Question
                        </button>
                    </div>
                            
                    { (questionType === "short-answer" || questionType === "paragraph") && 
                        (<RenderInputQuestion questionType={questionType} setQuestions={setQuestions} currentPage={currentPage}/>) }

                    { (questionType === "multiple-choice" || questionType === "checkbox" || questionType === "dropdown") && 
                        (<RenderOptionQuestion questionType={questionType} setQuestions={setQuestions} currentPage={currentPage} />) }

                    { (questionType === "file-submission") && 
                        (<RenderFileSubmissionQuestion questionType={null} setQuestions={setQuestions} currentPage={currentPage}/>) }
                </div>
            )}) }
                <LinkButton href="" className="primaryButton">
                    Create Exam
                </LinkButton>
            </div>
        </>
        // Finish this function such that 
        // the user is able to add questions per page.
        // Also, try to make sure that new pages are added/add-able?
    )
}