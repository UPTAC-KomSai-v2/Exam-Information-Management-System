import { type ReactNode, useEffect, useState } from "react";
import styles from "./page.module.css";
import { custom } from "zod";

export type InputQuestion = {
    type: string|null;
    id: string|null;
    question: string;
    wordLimit: number|null;
};

type OptionQuestion = {
    type: string|null;
    id: string;
    question: string;
    options: string[];
};

export type FileSubmissionQuestion = {
    type: string|null;
    id: string;
    question: string;
    maxNoOfSubmissions: number;
    maxFileSize: string;
    fileSubmissionTypes: {
        value: string;
        label: string;
    }[];
};

export type Question = InputQuestion | OptionQuestion | FileSubmissionQuestion;

type QuestionProps = {
    questionType:string|null;
    setQuestions:Function|null;
    currentPage:number;
}

export function RenderOptionQuestion({questionType, setQuestions, currentPage}:QuestionProps) {
    const [ options, setOptions ] = useState<string[]>([]);
    const [ count, setCount ] = useState(1);
    const [ question, setQuestion ] = useState<OptionQuestion>({
        type: questionType,
        id: crypto.randomUUID(),
        question: "Enter a question",
        options: options
    });

    if(!setQuestions) return <p>setQuestions Function is null</p>;

    setQuestions((prev:Question[]) => {
        const newQuestions = [...prev];
        const item = question; 
        newQuestions.splice(currentPage, 0, item);
        return newQuestions;
    });

    const optionType = (questionObj.type === "multiple-choice") ? "𖧋" : 
                (questionObj.type === "checkbox") ? "☐" : "";

    const addNewOption = () => {
        setOptions(prev => [
            ...prev, ""
        ]);
        setCount(count + 1);
    };

    const removeOption = (index: number) => {
        setOptions(prev => prev.filter((_, i) => i !== index));
    };

    const updateOption = (index: number, value: string) => {
        const updated = [...options];
        updated[index] = value;
        setOptions(updated);
    }

    return (
        <>
            {(questionObj.type != null) && (<p className="title17px">{questionObj.type.toUpperCase().replace("-", " ")}</p>)}
            
            <label style={{ display: "flex", flexDirection: "column", margin: "10px 0px"}}>
                Description/Question
                <textarea 
                    style={{height: "50px"}}
                    value={questionObj.question}
                />
            </label>

            <div className={styles.options}>
                <p>Options</p>
                { options.map((opt, i) => (
                    <label key={i} style={{display: "flex", width: "100%", gap: "5px"}}>
                        {(questionObj.type === "dropdown") ? `${i+1}) ` : `${optionType} `} 
                        <input 
                            type="text" 
                            placeholder={`Option ${i+1}`}
                            value={opt}
                            onChange={(e) => updateOption(i, e.target.value)}
                            style={{ width: "70%"}}
                        />
                        <button onClick={() => removeOption(i)} style={{ 
                            fontSize: "10px",
                            fontWeight: "bold",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            border: "1px solid transparent",
                            transition: "0.2s",
                            cursor: "pointer",
                            background: "#7B1113",
                            color: "#ffffff"
                        }}>
                            Remove
                        </button>
                    </label>
                ))}
                <button onClick={() => addNewOption()} className="secondaryButton">Add Option</button>
            </div>
        </>
    );
}
export function RenderInputQuestion({questionType, setQuestions, currentPage}:QuestionProps) {
    const [ wordLimit, setWordLimit ] = useState(300);
    const [ question, setQuestion ] = useState<string>("Enter a question");
    const [ questionObj, setQuestionObj ] = useState<InputQuestion>({
        type: questionType,
        id: crypto.randomUUID(),
        question: question,
        wordLimit: wordLimit
    });

    useEffect(() => {
        setQuestionObj({
            ...questionObj,
            question,
            wordLimit
        });
    }, [question, wordLimit]);

    useEffect(() => {
        if (setQuestions) {
            setQuestions((prev: Question[]) => {
                const newQuestions = [...prev];
                newQuestions.splice(currentPage, 0, questionObj);
                return newQuestions;
            });
        }
    }, [questionObj]);

    return(
        <>
            { (questionObj.type) && (<p className="title17px">{questionObj.type.toUpperCase().replace("-", " ")}</p>) }
            <label style={{display: "flex", flexDirection: "column", margin: "10px 0px"}}>
                Description/Question
                <textarea 
                    value={questionObj.question}
                    onChange={e => setQuestion(e.target.value)}
                    />
            </label>

            { (questionObj.type === "paragraph") && (
                <label style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                    Set Word Limit
                    <input 
                        type="number"
                        value={`${questionObj.wordLimit}`}
                        onChange={(e) => setWordLimit(Number(e.target.value))}
                    />
                </label>
            )}
            
        </>
    );
}

export function RenderFileSubmissionQuestion({questionType, setQuestions, currentPage}:QuestionProps) {
    const [ maxNoOfSubmissions,  setMaxNoOfSubmissions ] = useState(3);
    const [ maxFileSize, setMaxFileSize ] = useState("100-MB");
    const [ customFile, setCustomFile ] = useState<string>("");
    
    const fileOptions = [
        { value: "all-files", label: "All File Types" },
        { value: "documents", label: "Documents (.pdf, .doc, .docx, .txt, .rtf, .odt)" },
        { value: "spreadsheets", label: "Spreadsheets (.xls, .xlsx, .csv, .ods)" },
        { value: "presentations", label: "Presentations (.ppt, .pptx, .odp)" },
        { value: "image-files", label: "Image Files (.png, .jpg/.jpeg, .gif, .bmp, .tiff/.tif, .webp)" },
        { value: "video-files", label: "Video Files (.mp4, .mov, .avi, .wmv, .mkv)" },
        { value: "audio-files", label: "Audio Files (.mp3, .wav, .m4a, .ogg)" },
        { value: "code-files", label: "Code Files (.java, .py, .cpp, .c, .js, .ts, .html, .css, .php, .xml, .json, .ipynb, .sql)" },
        { value: "compressed-archives", label: "Compressed Archives (.zip, .rar, .7z, .tar.gz)" },
        { value: customFile, label: "Custom File" },
    ];
    
    const [ fileSubmissionTypes, setFileSubmissionTypes ] = useState(fileOptions);
    const [ question, setQuestion ] = useState<string>("Enter a question");
    const [ questionObj, setQuestionObj ] = useState<FileSubmissionQuestion>({
        type: questionType,
        id: crypto.randomUUID(),
        question,
        maxNoOfSubmissions,
        maxFileSize,
        fileSubmissionTypes,
    });

    useEffect(() => {
        setQuestionObj({
            ...questionObj,
            question,
            maxNoOfSubmissions,
            maxFileSize,
            fileSubmissionTypes,
        });
    }, [question, maxNoOfSubmissions, maxFileSize, fileSubmissionTypes]);

    useEffect(() => {
        if (setQuestions) {
            setQuestions((prev: Question[]) => {
                const newQuestions = [...prev];
                newQuestions.splice(currentPage, 0, questionObj);
                return newQuestions;
            });
        }
    }, [questionObj]);

    const handleCheck = (value: string, label: string) => {
    setFileSubmissionTypes(prev => {
            // check if already exists
            const exists = prev.some(item => item.label === label);

            if (exists) {
                return prev.filter(item => item.value !== value);
            }

            if (value === "all-files") {
                return [{ value, label }];
            }
            
            const filtered = prev.filter(item => item.value !== "all-files");
            return [...filtered, { value, label }];
        });
    };

    const [ isChecked, setIsChecked ] = useState(false);
    useEffect(() => {
        setIsChecked(fileSubmissionTypes.some(item => item.label === "Custom File" || item.value === "all-files") );
    }, [fileSubmissionTypes]);

    const RenderFileTypes = () => {
        const checkedAllFiles = fileSubmissionTypes.some(type => type.value === "all-files");
        return (
        <div>
            {fileOptions.map(opt => {
                return (
                <label key={opt.value} style={{ display: "block", marginBottom: "5px" }}>
                <input
                    type="checkbox"
                    checked={fileSubmissionTypes.some(type => type.label === opt.label) || checkedAllFiles}
                    onChange={() => handleCheck(opt.value, opt.label)}
                />
                {opt.label}
                </label>
            )})}
            
            { isChecked  && (
                <label>
                Custom File Type:
                <input 
                    type="text" 
                    onChange={e => setCustomFile(e.target.value)}
                />
                </label>
            )}
            </div>
        );
    }

    return (
        <>
            <p className="title17px">FILE SUBMISSION</p>
            <label>
                Description/Question
                <textarea 
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    style={{height: "75px", width: "100%"}}
                />
            </label>

            <label style={{display: "block", margin: "5px 0px"}}>
                Maximum number of files
                <select
                    value={ maxNoOfSubmissions }
                    onChange={e =>  setMaxNoOfSubmissions(Number(e.target.value))}
                >
                    <option value="1">1</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
            </label>

            <label style={{display: "block", margin: "5px 0px"}}>
                Maximum file size
                <select
                    value={ maxFileSize }
                    onChange={e =>  setMaxFileSize(e.target.value)}
                >
                    <option value="1-MB">1 MB</option>
                    <option value="10-MB">10 MB</option>
                    <option value="100-MB">100 MB</option>
                    <option value="1-GB">1 GB</option>
                    <option value="10-GB">10 GB</option>
                </select>
            </label>

            <p>File Types</p>
            <RenderFileTypes />
        </>
    )
}

type DescProps = {
descriptions:string[];
setDescriptions:Function;
currentPage:number;
}

export function RenderDescription({descriptions, setDescriptions, currentPage}: DescProps) {
    const updateDescription = (value: string) => {
        let newDescriptions = [...descriptions];
        newDescriptions[currentPage] = value;
        setDescriptions(newDescriptions);
    } 

    return (
        <label style={{ display: "flex", flexDirection: "column"}}>
            Page Description
            <textarea 
                value={descriptions[currentPage]}
                onChange={(e) => updateDescription(e.target.value)}
                style={{ height: "100px"}}
            />
        </label>
    );
}

