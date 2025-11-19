import { Ref, useRef } from "react";
import styles from "./shared.module.css";

export function InputContent({str, placeholder, type, ref}:{str: string, placeholder: string, type: string, ref: Ref<HTMLInputElement>}){
  console.log(str);
  console.log(placeholder);
  return (
    <div>
      <label>{str}</label>
      <input 
        placeholder={placeholder} 
        ref={ref}
        type={type}
        ></input>
    </div>
  );
}

export function LinkButton({str, href}:{str: string, href: string}){ 
  return(
    <a
      className={styles.link}
      href={href}
      rel="noopener noreferrer"
    >
      {str}
    </a>
  );
}

type AppState = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowUserRole: React.Dispatch<React.SetStateAction<boolean>>;
  setUserRole: React.Dispatch<React.SetStateAction<string>>;
};

export function Button({ str, setUseStates }: { str: string, setUseStates: AppState}) {
  return (
    <button 
      className="primaryButton"
      onClick={ () => {
        setUseStates.setShow(true);
        setUseStates.setShowUserRole(false);
        setUseStates.setUserRole(str);
      }}
      rel="noopener noreferrer"
    >
      {str}
    </button>
  );
}


