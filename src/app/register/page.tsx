"use client";
import styles from "./page.module.css";
import Nav from "@/app/components/homepageNav";
import Logo from "@/app/components/logo";
import sharedStyles from "@/app/components/shared.module.css";
import { LinkButton, Button, InputContent } from "@/app/components/sharedComponents";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Register() {
  const router = useRouter();
  
  const [ showRegister, setShow ] = useState(false);
  const [ showUserRole, setShowUserRole ] = useState(true);
  const [ userRole, setUserRole ] = useState<string>("");

  const validateRegistration = () => {
    console.log("bruh");
    router.push(userRole === "Employee" ? "/user/professor" : "/user/student");
  };

  return (
    <div className={`page ${sharedStyles.imageBackground}`}>
      <Nav />
      <main className="main">
        { showUserRole && (
          <div className={sharedStyles.centeredDiv}>
            <Logo width={250} height={28} />
            <p className="title17px">Registering an Account</p>
            <hr />

            <p className="innerTitle">What are you registering as?</p>
            <div className={sharedStyles.colButtons}>
              <Button str="Employee" setUseStates={ {setShow, setShowUserRole, setUserRole }}/>
              <Button str="Student" setUseStates={ {setShow, setShowUserRole, setUserRole }}/>
            </div>
              
            <LinkButton str="Already have an account? Login here." href="/login" />
          </div>
        )}
        { showRegister && (
          <div className={sharedStyles.centeredDiv}>
            <Logo width={250} height={28} />
            <p className={"title17px"}>Registering as Professor</p>
            <hr />

            <p className={"innerTitle"}>Personal Information</p>
            <PersonalInformation />

            <p className={"innerTitle"}>University Information</p>
            <DisplayUniversityInformation userRole={userRole} />

            <p className={"innerTitle"}>Password Creation</p>
            <CreatePassword />

            <div className={sharedStyles.rowButtons}>
              <button 
                className="primaryButton"
                onClick={() => {
                  setShow(false);
                  setShowUserRole(true);
                }}
              >
                Go Back
              </button>
              <button 
                className="primaryButton"
                onClick={ validateRegistration }
              >
                Create Account
              </button>
            </div>
            
            <LinkButton str="Already have an account? Login here."  href="/login" />
          </div>
        )}
      </main>
    </div>
  );
}

function PersonalInformation() {
    const firstNameRef = useRef<HTMLInputElement>(null);
    const middleNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    return (
        <div className={styles.container}>
            <InputContent str="First Name" placeholder="E.g. Juan" type="name" ref={firstNameRef} />
            <InputContent str="Middle Name" placeholder="E.g. Marello" type="name" ref={middleNameRef} />
            <InputContent str="Last Name" placeholder="E.g. Dela Cruz" type="name" ref={lastNameRef} />
        </div>
    );
}

function CreatePassword() {
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    return (
        <div className={styles.container}>
            <InputContent str="Password" placeholder="Create a password" type="password" ref={passwordRef} />
            <InputContent str="Confirm Password" placeholder="Retype password" type="password" ref={confirmPasswordRef} />
        </div>
    );
}

function DisplayUniversityInformation({userRole}:{userRole: string}) {
  const campusRef = useRef<HTMLInputElement>(null);
  const userNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  if(userRole === "Employee") {
    const collegeRef = useRef<HTMLInputElement>(null);
    return (
      <>
      <div className={styles.container}>
        <InputContent str="Campus" placeholder="E.g. Tacloban College" type="text" ref={campusRef} />
        <InputContent str="College" placeholder="E.g. DNSM" type="text" ref={collegeRef} />
      </div>
      <div className={styles.container}>
        <InputContent str="Employee Number" placeholder="Enter employee no." type="text" ref={userNumberRef}/>
        <InputContent str="UP Email Address" placeholder="Format: xxx@up.edu.ph" type="email" ref={emailRef}/>
      </div>
      </>
    );
  } else if(userRole === "Student"){
    const programRef = useRef<HTMLInputElement>(null);
    return (
      <>
      <div className={styles.container}>
        <InputContent str="Campus" placeholder="E.g. Tacloban College" type="text" ref={campusRef} />
        <InputContent str="Program" placeholder="E.g. BS Computer Science" type="text" ref={programRef} />
      </div>
      <div className={styles.container}>
        <InputContent str="Student Number" placeholder="Enter student no." type="text" ref={userNumberRef}/>
        <InputContent str="UP Email Address" placeholder="Format: xxx@up.edu.ph" type="email" ref={emailRef}/>
      </div>
      </>
    );
  } 
  return (
    <div className={styles.container}>
      <p>invalid selection</p>
    </div>
  );
}



