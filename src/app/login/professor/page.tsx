"use client";

import styles from "./page.module.css";
import Nav from "@/app/components/homepageNav";
import Logo from "@/app/components/logo";
import { Ref, useContext, useRef } from "react";

// temporary data
import { faculty } from "@/app/data/data";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/UserContext";

export default function Login() {
  const router = useRouter();
  const facultyNumberRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setCurrentUser } = useContext(UserContext);

  const validateUser = () => {
    //MAKE THIS INTO ACTUAL UI STUFF
    //FOR NOW THIS IS TEMPORARY
    if(!(facultyNumberRef.current && passwordRef.current)){
      console.log("Please fill all the required fields.");
      return;
    }

    const facultyNumber = facultyNumberRef.current.value;
    const password = passwordRef.current.value;
    if(!(facultyNumber.length > 0 && password.length > 0)){
      console.log("Please fill all the required fields.");
      return;
    }

    // user verification and identification
    console.log(facultyNumber);
    console.log(password);
    
    faculty.forEach((user) => {
      if(user.facultyNo === facultyNumber) {
        if(user.password === password){
          setCurrentUser(user);
          router.push("/user/professor");
          return;
        }
        console.log("Incorrect username or password.");
      }
    });
  };

  return (
    <div className={styles.page}>
      <Nav />

      <main className={styles.main}>
        <div className={styles.login}>
          { Logo(250, 28) }
          <p className={styles.title}>Logging in as Professor</p>
          <hr />
          
          <div className={styles.container}>
            { inputContent("Faculty Number", "Enter your faculty no.", "name", facultyNumberRef) }
            { inputContent("Password", "Enter your password", "password", passwordRef) }
          </div>
          <button 
            className={styles.primary}
            onClick={validateUser}
          >
            Log In 
          </button>

         <a
            className={styles.link}
            href="/register"
            rel="noopener noreferrer"
          >
            Don't have an account yet? Register here.
          </a>
          
        </div>
      </main>
    </div>
  );
}

function inputContent(str: string, placeholder: string, type: string, ref: Ref<HTMLInputElement>){
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
