"use client";

import styles from "./page.module.css";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { UserRoleToggle, InputContent, type UserRole } from "../_components/sharedComponents";
import sharedStyles from "~/styles/shared.module.css";
import { UserContext } from "../UserContext";
import Nav from "../_components/homepageNav";
import { LinkButton } from "../_components/links";
import Logo from "../_components/logo";
import { employees, students } from "../data/data";

export default function Login() {
    const [ showLogin, setShow ] = useState(false);
    const [ showUserRole, setShowUserRole ] = useState(true);
    const [ userRole, setUserRole ] = useState<UserRole>("");
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
                            <UserRoleToggle userRole="Employee" setUseStates={ {setShow, setShowUserRole, setUserRole }}/>
                            <UserRoleToggle userRole="Student" setUseStates={ {setShow, setShowUserRole, setUserRole }}/>
                        </div>
                        
                        <LinkButton href="/register">
                            Don&apos;t have an account yet? Register here.
                        </LinkButton>
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
                        
                        <LinkButton href="/register">
                            Don&apos;t have an account yet? Register here.
                        </LinkButton>
                    </div>
                )}
            </main>
        </div>
    );
}
