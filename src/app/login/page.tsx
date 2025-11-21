"use client";
import styles from "./page.module.css";
import sharedStyles from "@/app/components/shared.module.css";
import Nav from "@/app/components/homepageNav";
import Logo from "@/app/components/logo";
import { LinkButton, InputContent, Button } from "../components/sharedComponents";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../UserContext";
import { employees, students } from "../data/data";

export default function Login() {
  const [ showLogin, setShow ] = useState(false);
  const [ showUserRole, setShowUserRole ] = useState(true);
  const [ userRole, setUserRole ] = useState<string>("");
  const [ userNumberType, setUserNumberType ] = useState<string>("");
  const [ userPlaceholder, setUserPlaceholder ] = useState<string>("");
  
  useEffect(() => {
    const newUserNumberType = (userRole) === "Student" ? "Student Number" : "Employee Number";
    setUserNumberType(newUserNumberType);
    setUserPlaceholder(`Enter your ${newUserNumberType}`);
  }, [userRole]);

  const router = useRouter();
  const numberRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setCurrentUser } = useContext(UserContext);

  const validateUser = () => {
    //MAKE THIS INTO ACTUAL UI STUFF
    //FOR NOW THIS IS TEMPORARY
    if(!(numberRef.current && passwordRef.current)){
      console.log("Please fill all the required fields.");
      return;
    }

    const userNumber = numberRef.current.value;
    const password = passwordRef.current.value;
    if(!(userNumber.length > 0 && password.length > 0)){
      console.log("Please fill all the required fields.");
      return;
    }

    // user verification and identification
    const users = userRole === "Student" ? students : employees;

    users.forEach((user) => {
      let userNo:unknown = "";
      if("studentNo" in user) {
        userNo = user.studentNo;
      } else if("employeeNo" in user) {
        userNo = user.employeeNo;
      }

      if(userNo !== userNumber) {
        console.log("Incorrect username or password.");
        return;
      }
      if(user.password === password){
        setCurrentUser(user);
        router.push(userRole === "Employee" ? "/user/employee" : "/user/student");
      }
    });
  };

  return (
    <div className={`page ${sharedStyles.imageBackground}`}>
      <Nav />
      <main className="main">
        { showUserRole && (
          <div className={sharedStyles.centeredDiv}>
            <Logo width={250} height={28}/>
            <p className="title17px">Logging Into an Account</p>
            <hr />

            <p className="innerTitle">What are you logging in as?</p>
            <div className={sharedStyles.colButtons}>
              <Button str="Employee" setUseStates={ {setShow, setShowUserRole, setUserRole }}/>
              <Button str="Student" setUseStates={ {setShow, setShowUserRole, setUserRole }}/>
            </div>
        
          <LinkButton str="Don't have an account yet? Register here." href="/register" />
          </div>
        )}
        { showLogin && (
          <div className={sharedStyles.centeredDiv}>
            <Logo width={250} height={28}/>
            <p className="title17px">Logging in as {userRole}</p>
            <hr />
            
            <div className={styles.container}>
              <InputContent str={userNumberType} placeholder={userPlaceholder} type="name" ref={numberRef} />
              <InputContent str="Password" placeholder="Enter your password" type="password" ref={passwordRef} />
            </div>
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
                onClick={validateUser}
              >
                Log In 
              </button>
            </div>
          
            <LinkButton str="Don't have an account yet? Register here." href="/register" />
          </div>
        )}
      </main>
    </div>
  );
}





