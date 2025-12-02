import { type ReactNode, useEffect, useState } from "react";
import styles from "./page.module.css";

export function RenderOptionQuestion({option}:{option : string}) {
    const [ options, setOptions ] = useState<string[]>([]);
    const [ count, setCount ] = useState(1);
    const optionType = (option === "multiple-choice") ? "𖧋" : 
                (option === "checkbox") ? "☐" : "";

    console.log(option);

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
            <p className="title17px">{option.toUpperCase().replace("-", " ")}</p>
            
            <label style={{ display: "flex", flexDirection: "column", margin: "10px 0px"}}>
                Description/Question
                <textarea style={{height: "50px"}}/>
            </label>

            <div className={styles.options}>
                <p>Options</p>
                { options.map((opt, i) => (
                    <label key={i} style={{display: "flex", width: "100%", gap: "5px"}}>
                        {(option === "dropdown") ? `${i+1}) ` : `${optionType} `} 
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

export function RenderInputQuestion({inputType}:{inputType: string}) {
    return(
        <>
            <p className="title17px">{inputType.toUpperCase().replace("-", " ")}</p>
            <label style={{display: "flex", flexDirection: "column", margin: "10px 0px"}}>
                Description/Question
                <textarea />
            </label>

            { (inputType === "paragraph") && (
                <label style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                    Set Word Limit
                    <input type="number"/>
                </label>
            )}
            
        </>
    );
}

export function RenderFileSubmissionQuestion() {
    const [  maxNoFileSubmission,  setMaxNoFileSubmission ] = useState("1");
    const [ maxFileSubmission, setMaxFileSubmission ] = useState("100-MB");
    const [ fileSubmissionType, setFileSubmissionType ] = useState("all-files");

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
        { value: "custom-file", label: "Custom File" },
    ];

    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

    const handleCheck = (value: string) => {
        setSelectedFiles(prev =>
        prev.includes(value)
            ? prev.filter(v => v !== value) // uncheck
            : [...prev, value]              // check
        );
    };

    const RenderFileTypes = () => {
        return (
        <div>
            {fileOptions.map(opt => {
                const selectedAllFiles = (selectedFiles.includes("all-files") && opt.value !== "all-files") ? false : selectedFiles.includes(opt.value);

                return (
                <label key={opt.value} style={{ display: "block", marginBottom: "5px" }}>
                <input
                    type="checkbox"
                    checked={selectedAllFiles}
                    onChange={() => handleCheck(opt.value)}
                />
                {opt.label}
                </label>
            )})}
            
            {selectedFiles.includes("custom-file") && (
                <label>
                Custom File Type:
                <input type="text" />
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
                <textarea />
            </label>

            <label>
                Maximum number of files
                <select
                    value={ maxNoFileSubmission }
                    onChange={e =>  setMaxNoFileSubmission(e.target.value)}
                >
                    <option value="1">1</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
            </label>

            <label>
                Maximum file size
                <select
                    value={ maxFileSubmission }
                    onChange={e =>  setMaxFileSubmission(e.target.value)}
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

            {   fileSubmissionType === "custom-file" && (
                <label>
                    Custom File type
                    <input type="text"/>
                </label>
            )}
        </>
    )
}

