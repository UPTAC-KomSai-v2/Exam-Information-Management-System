"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Nav from "@/app/components/homepageNav";
import Logo from "@/app/components/logo";
import { Ref, useRef, useState } from "react";

// temporary data
import { students } from "@/app/data/data";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const studentNumberRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const validateUser = () => {
    //MAKE THIS INTO ACTUAL UI STUFF
    //FOR NOW THIS IS TEMPORARY
    if(!(studentNumberRef.current && passwordRef.current)){
      console.log("Please fill all the required fields.");
      return;
    }

    const studentNumber = studentNumberRef.current.value;
    const password = passwordRef.current.value;
    if(!(studentNumber.length > 0 && password.length > 0)){
      console.log("Please fill all the required fields.");
      return;
    }

    // user verification and identification
    console.log(studentNumber);
    console.log(password);
    
    students.forEach((user) => {
      if(user.studentNo === studentNumber) {
        if(user.password === password){
          router.push("/user/student");
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
          <p className={styles.title}>Logging in as Student</p>
          <hr />
          
          <div className={styles.container}>
            { inputContent("Student Number", "Enter your student no.", "name", studentNumberRef) }
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
